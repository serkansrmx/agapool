# E2E test: signup -> signin -> insert transaction -> verify
$URL = 'https://jpbeygpwxcxwqlsxfgew.supabase.co'
$PUB = 'sb_publishable_sA-5DCgCso1-doG_x1S5Ug_qKqs5Lqj'

# use a unique email
$timestamp = [int][double]::Parse((Get-Date -UFormat %s))
$email = "e2e+${timestamp}@example.com"
$pw = 'Testpass123!'

Write-Host "Using email: $email"

# Sign up
$body = @{email=$email; password=$pw} | ConvertTo-Json
try {
  $signup = Invoke-RestMethod -Uri "$URL/auth/v1/signup" -Method Post -Headers @{apikey=$PUB; "Content-Type"="application/json"} -Body $body -ErrorAction Stop
  Write-Host "Signup response:"
  $signup | ConvertTo-Json | Write-Host
} catch {
  Write-Host "Signup failed:`n$($_.Exception.Message)"
}

# Sign in to get access_token
try {
  $token = Invoke-RestMethod -Uri "$URL/auth/v1/token?grant_type=password" -Method Post -Headers @{apikey=$PUB; "Content-Type"="application/json"} -Body $body -ErrorAction Stop
  Write-Host "Signin succeeded. user id: $($token.user.id)"
} catch {
  Write-Host "Signin failed:`n$($_.Exception.Message)"
  exit 1
}

$access = $token.access_token
$uid = $token.user.id

# Insert a transaction via PostgREST using the user's access token
$tx = @{user_id=$uid; amount=123.45; type='deposit'; status='pending'} | ConvertTo-Json
try {
  $insert = Invoke-RestMethod -Uri "$URL/rest/v1/transactions" -Method Post -Headers @{"apikey"=$PUB; "Authorization"="Bearer $access"; "Content-Type"="application/json"; "Prefer"="return=representation"} -Body $tx -ErrorAction Stop
  Write-Host "Inserted transaction:"
  $insert | ConvertTo-Json | Write-Host
} catch {
  Write-Host "Insert failed:`n$($_.Exception.Message)"
  exit 1
}

# Query transactions for the user
try {
  $q = Invoke-RestMethod -Uri "$URL/rest/v1/transactions?user_id=eq.$uid&select=*" -Method Get -Headers @{"apikey"=$PUB; "Authorization"="Bearer $access"} -ErrorAction Stop
  Write-Host "Queried transactions for user:"
  $q | ConvertTo-Json | Write-Host
} catch {
  Write-Host "Query failed:`n$($_.Exception.Message)"
  exit 1
}

Write-Host "E2E test completed successfully."
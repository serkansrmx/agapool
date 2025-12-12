# E2E admin test: uses service_role secret to insert transaction (bypass RLS)
# NOTE: This script uses the project service key. Do NOT share its output publicly.
$URL = 'https://jpbeygpwxcxwqlsxfgew.supabase.co'
$PUB = 'sb_publishable_sA-5DCgCso1-doG_x1S5Ug_qKqs5Lqj'
$SERVICE = 'sb_secret_iLaLWKj0BN-hGQRYTlL1MA_Ev8Kqj' # placeholder - you should replace with your regenerated secret

# For safety, read real secret from env if present
if ($env:SUPABASE_SERVICE_KEY) { $SERVICE = $env:SUPABASE_SERVICE_KEY }

# Use the user created by the previous script if provided, else create a new test user
$uid = $args[0]
if (-not $uid) {
  Write-Host "No user id provided. Create a test signup and use its id."
  $timestamp = [int][double]::Parse((Get-Date -UFormat %s))
  $email = "e2e-admin+${timestamp}@example.com"
  $pw = 'Testpass123!'
  $body = @{email=$email; password=$pw} | ConvertTo-Json
  $token = Invoke-RestMethod -Uri "$URL/auth/v1/token?grant_type=password" -Method Post -Headers @{apikey=$PUB; "Content-Type"="application/json"} -Body $body
  $uid = $token.user.id
  Write-Host "Created user id (hidden)"
}

# Insert a transaction using service key
$tx = @{user_id=$uid; amount=999.99; type='deposit'; status='pending'} | ConvertTo-Json
try {
  $insert = Invoke-RestMethod -Uri "$URL/rest/v1/transactions" -Method Post -Headers @{"apikey"=$SERVICE; "Authorization"="Bearer $SERVICE"; "Content-Type"="application/json"; "Prefer"="return=representation"} -Body $tx -ErrorAction Stop
  Write-Host "Inserted transaction (admin): id=$($insert.id) status=$($insert.status)"
} catch {
  Write-Host "Admin insert failed:`n$($_.Exception.Message)"
  exit 1
}

# Query the inserted transaction
try {
  $q = Invoke-RestMethod -Uri "$URL/rest/v1/transactions?user_id=eq.$uid&select=*" -Method Get -Headers @{"apikey"=$SERVICE; "Authorization"="Bearer $SERVICE"} -ErrorAction Stop
  Write-Host "Queried transactions (admin): count=$($q.Count)"
} catch {
  Write-Host "Admin query failed:`n$($_.Exception.Message)"
  exit 1
}

Write-Host "E2E admin test completed successfully."
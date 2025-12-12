const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing from .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function promoteUser(email) {
    /*
     * 1. Get User ID from Auth
     */
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers()

    if (userError) {
        console.error('Error listing users:', userError.message)
        return
    }

    const user = users.find(u => u.email === email)

    if (!user) {
        console.error(`User with email ${email} not found.`)
        return
    }

    console.log(`Found user: ${user.id} (${user.email})`)

    /*
     * 2. Update Profile to 'active' and 'admin'
     */
    const { error: updateError } = await supabase
        .from('profiles')
        .update({
            status: 'active',
            role: 'admin'
        })
        .eq('id', user.id)

    if (updateError) {
        console.error('Error updating profile:', updateError.message)
    } else {
        console.log(`SUCCESS: User ${email} is now an ADMIN and ACTIVE.`)
    }
}

const email = process.argv[2]
if (!email) {
    console.log('Usage: node scripts/make-admin.js <email>')
    process.exit(1)
}

promoteUser(email)

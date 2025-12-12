"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function Navbar() {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <nav className="border-b bg-background">
            <div className="flex h-16 items-center px-4 container mx-auto">
                <Link href="/" className="font-bold text-lg mr-6">TCK Fonu</Link>
                <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">Dashboard</Link>
                    <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">Admin</Link>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                </div>
            </div>
        </nav>
    )
}

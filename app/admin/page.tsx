import AdminPanel from "@/components/admin/AdminPanel";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Check if user is admin
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        redirect('/');
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white pb-20">
            {/* Navbar */}
            <nav className="border-b border-brand-gold/10 bg-brand-dark/50 backdrop-blur-md p-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <a href="/" className="text-xs text-brand-gray/50 hover:text-brand-gold transition-colors">← ANA SAYFA</a>
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-lightGold text-xl">
                        TCK POOL / ADMIN
                    </span>
                </div>
                <span className="text-xs font-mono text-brand-gray/50">Yönetici Olarak Giriş Yapıldı</span>
            </nav>

            <div className="max-w-2xl mx-auto p-4 mt-6">
                <AdminPanel />
            </div>
        </main>
    )
}

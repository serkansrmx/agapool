import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import BalanceCard from '@/components/dashboard/BalanceCard';
import TransactionForm from '@/components/forms/TransactionForm';
import Leaderboard from '@/components/dashboard/Leaderboard';

export default async function Dashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch Profile to check Status
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // 🔒 SECURITY GATE: Pending Users
  if (profile?.status === 'pending') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-cyan-500 font-mono p-4">
        <div className="border border-cyan-500/50 p-8 rounded-lg bg-zinc-900/50 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <h1 className="text-3xl font-bold mb-4">ERİŞİM REDDEDİLDİ</h1>
          <p className="text-gray-300">Hesabınız şu anda <span className="text-yellow-400">ONAY BEKLİYOR</span>.</p>
          <p className="text-sm text-gray-500 mt-2">Lütfen girişiniz onaylanana kadar bir Admin'den (Aga) onay bekleyin.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">
      {/* Navbar Placeholder */}
      <nav className="border-b border-brand-gold/10 bg-brand-dark/50 backdrop-blur-md p-4 flex justify-between items-center sticky top-0 z-50">
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-lightGold text-xl">
          TCK POOL
        </span>
        <div className="flex gap-4 items-center">
          {profile?.role === 'admin' && <a href="/admin" className="text-xs text-brand-gold hover:underline">ADMIN PANEL</a>}
          <span className="text-xs font-mono text-brand-gray/50">@{profile?.username}</span>
        </div>
      </nav>

      <div className="max-w-md mx-auto p-4 space-y-8 mt-6">

        {/* 1. Total Balance Component */}
        <BalanceCard />

        {/* 2. Action Area */}
        <section>
          <h2 className="text-sm font-bold text-brand-gray/40 mb-2 uppercase tracking-wider">İşlemler</h2>
          <TransactionForm userId={user.id} />
        </section>

        {/* 3. Leaderboard */}
        <section>
          <h2 className="text-sm font-bold text-brand-gray/40 mb-2 uppercase tracking-wider">En Baba Agalar</h2>
          <Leaderboard />
        </section>
      </div>
    </main>
  );
}

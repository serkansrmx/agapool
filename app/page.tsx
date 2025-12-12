import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { WarChestCard } from '@/components/dashboard/WarChestCard';
import { TargetCard } from '@/components/dashboard/TargetCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { Bell, Plus, ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Mock Transactions (Temporary, replace with real fetch logic later)
  const mockTransactions = [
    { id: '1', amount: 1250, status: 'approved', created_at: new Date().toISOString(), note: 'Mart Aidati', user_email: 'Ahmet Aga' },
    { id: '2', amount: 500, status: 'approved', created_at: new Date(Date.now() - 86400000).toISOString(), note: 'Ekstra', user_email: 'Mehmet Aga' },
    { id: '3', amount: 3000, status: 'pending', created_at: new Date(Date.now() - 172800000).toISOString(), note: 'Gecikmis Odeme', user_email: 'Ali Aga' },
    { id: '4', amount: 1500, status: 'approved', created_at: new Date(Date.now() - 240000000).toISOString(), note: 'Nisan Aidati', user_email: 'Veli Aga' },
  ];

  return (
    <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-purple/30">

      {/* 1. Sidebar Navigation */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="pl-64">
        {/* Header */}
        <header className="h-24 px-8 flex items-center justify-between border-b border-white/5 bg-brand-dark/50 backdrop-blur sticky top-0 z-40">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-brand-text">Welcome back, Aga. Here's the war chest status.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-brand-card border border-white/5 flex items-center justify-center text-brand-text hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-brand-card" />
            </button>
            <Button className="bg-brand-purple hover:bg-brand-purpleLight text-white rounded-xl h-10 px-6 font-bold shadow-lg shadow-brand-purple/20">
              <Plus className="w-4 h-4 mr-2" />
              Deposit Funds
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="p-8 max-w-[1600px] mx-auto space-y-8">

          {/* Top Row: Cards */}
          <div className="grid grid-cols-12 gap-8">
            <WarChestCard />
            <TargetCard />
          </div>

          {/* Middle Row: Chart & Leaderboard (Placeholder for now) */}
          <div className="grid grid-cols-12 gap-8">
            {/* Growth Chart Placeholder */}
            <div className="col-span-12 md:col-span-8 bg-brand-card rounded-3xl p-8 border border-white/5 h-[400px] flex items-center justify-center text-brand-text">
              [Growth Chart Coming Soon]
            </div>

            {/* Top Agalar Placeholder */}
            <div className="col-span-12 md:col-span-4 bg-brand-card rounded-3xl p-8 border border-white/5 h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="text-yellow-400">👑</div>
                  <h3 className="font-bold text-white">Top Agalar</h3>
                </div>
                <span className="text-xs text-brand-purple cursor-pointer hover:underline">View All</span>
              </div>
              <div className="space-y-4">
                {/* Mock List */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-brand-dark/50 border border-white/5">
                    <span className="text-brand-purple font-bold font-mono">#{i}</span>
                    <div className="w-10 h-10 rounded-full bg-brand-gray/20"></div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-sm">Aga #{i}</p>
                      <p className="text-brand-text text-xs">Member</p>
                    </div>
                    <span className="text-white font-bold">$1,200</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: Activity Feed */}
          <div className="bg-brand-card rounded-3xl p-8 border border-white/5">
            <h3 className="font-bold text-white mb-6">Recent Activity</h3>
            <div className="grid grid-cols-12 text-xs text-brand-text uppercase font-bold tracking-wider mb-4 px-4">
              <div className="col-span-4">Transaction</div>
              <div className="col-span-3">User</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            <div className="space-y-2">
              {mockTransactions.map((tx) => (
                <div key={tx.id} className="grid grid-cols-12 items-center p-4 hover:bg-white/5 rounded-xl transition-colors border-b border-white/5 last:border-0 group">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-neonGreen/10 flex items-center justify-center text-brand-neonGreen">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm group-hover:text-brand-purple transition-colors">{tx.note || 'Contribution'}</p>
                    </div>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-gray/20" />
                    <span className="text-brand-text text-sm">{tx.user_email?.split(' ')[0]}</span>
                  </div>
                  <div className="col-span-3 text-brand-text text-sm">
                    {new Date(tx.created_at).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 text-right font-bold text-brand-neonGreen">
                    +${tx.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

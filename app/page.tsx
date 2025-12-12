import { Sidebar } from '@/components/layout/Sidebar';
import { WarChestCard } from '@/components/dashboard/WarChestCard';
import { TargetCard } from '@/components/dashboard/TargetCard';
import { GrowthChart } from '@/components/dashboard/GrowthChart';
import { TopAgalar } from '@/components/dashboard/TopAgalar';
import { RecentActivityTable } from '@/components/dashboard/RecentActivityTable';
import { Bell, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // Auth Check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <main className="bg-dark-bg text-gray-300 antialiased h-screen flex overflow-hidden font-sans">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 relative pl-72"> {/* Added pl-72 to account for fixed sidebar width */}

        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <p className="text-gray-400 text-sm">Welcome back, Agalar. Here's the war chest status.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-blue rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 bg-accent-purple hover:bg-accent-purpleLight text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-900/50">
              <Plus className="w-5 h-5" />
              Deposit Funds
            </button>
          </div>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Card 1: Total War Chest (2/3 width) */}
          <WarChestCard />

          {/* Card 2: Goal (1/3 width) */}
          <TargetCard />
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Card 3: Chart (2/3 width) */}
          <GrowthChart />

          {/* Card 4: Leaderboard (1/3 width) */}
          <TopAgalar />
        </div>

        {/* Recent Activity Table */}
        <RecentActivityTable />

      </div>
    </main>
  );
}

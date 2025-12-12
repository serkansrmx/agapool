'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile, Transaction } from '@/types/database';
import { Check, X } from 'lucide-react';

export default function AdminPanel() {
  const [pendingUsers, setPendingUsers] = useState<Profile[]>([]);
  const [pendingTrans, setPendingTrans] = useState<Transaction[]>([]);
  const supabase = createClient();

  // Fetch Data
  const fetchData = async () => {
    // Get Pending Users
    const { data: users } = await supabase
      .from('profiles')
      .select('*')
      .eq('status', 'pending');
    if (users) setPendingUsers(users);

    // Get Pending Transactions with User data
    const { data: trans } = await supabase
      .from('transactions')
      .select('*, profiles(username)')
      .eq('status', 'pending');
    if (trans) setPendingTrans(trans as any);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Actions
  const approveUser = async (id: string) => {
    await supabase.from('profiles').update({ status: 'active' }).eq('id', id);
    fetchData(); // Refresh
  };

  const handleTransaction = async (id: number, status: 'approved' | 'rejected') => {
    await supabase.from('transactions').update({ status }).eq('id', id);
    fetchData(); // Refresh
  };

  return (
    <div className="space-y-8">
      {/* 1. User Approvals */}
      <div className="bg-brand-dark/30 border border-brand-gold/20 p-4 rounded-lg">
        <h3 className="text-brand-gold font-mono text-sm mb-4">AGA ADAYLARI ({pendingUsers.length})</h3>
        {pendingUsers.length === 0 && <p className="text-brand-gray/40 text-xs">Onay bekleyen üye yok.</p>}
        <ul className="space-y-3">
          {pendingUsers.map(user => (
            <li key={user.id} className="flex justify-between items-center bg-black/20 p-3 rounded border border-white/5">
              <span className="text-brand-gray font-medium">{user.username || 'Bilinmiyor'}</span>
              <button
                onClick={() => approveUser(user.id)}
                className="bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold p-2 rounded-full transition"
              >
                <Check size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Transaction Verification */}
      <div className="bg-brand-dark/30 border border-brand-lightGold/20 p-4 rounded-lg">
        <h3 className="text-brand-lightGold font-mono text-sm mb-4">BEKLEYEN İŞLEMLER ({pendingTrans.length})</h3>
        {pendingTrans.length === 0 && <p className="text-brand-gray/40 text-xs">Bekleyen işlem yok.</p>}
        <ul className="space-y-3">
          {pendingTrans.map(t => (
            <li key={t.id} className="bg-black/20 p-3 rounded flex flex-col gap-2 border border-white/5">
              <div className="flex justify-between text-sm">
                <span className="text-brand-gray/70">@{t.profiles?.username}</span>
                <span className="text-brand-lightGold font-bold">₺{t.amount}</span>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => handleTransaction(t.id, 'rejected')}
                  className="px-3 py-1 text-xs bg-red-900/20 text-red-400 rounded hover:bg-red-900/40 border border-red-900/30"
                >
                  Reddet
                </button>
                <button
                  onClick={() => handleTransaction(t.id, 'approved')}
                  className="px-3 py-1 text-xs bg-brand-gold/20 text-brand-lightGold rounded hover:bg-brand-gold/30 border border-brand-gold/20"
                >
                  Dekontu Onayla
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile, Transaction } from '@/types/database';
import { approveUserAction, handleTransactionAction, getAdminData, deleteTransactionAction, deleteProposalAction } from '@/app/actions/admin';
import { Check, X, Trash2, Vote } from 'lucide-react';

interface Proposal { // Add simple interface locally or import
  id: number;
  content: string;
  profiles: { username: string };
}

export default function AdminPanel() {
  const [pendingUsers, setPendingUsers] = useState<Profile[]>([]);
  const [pendingTrans, setPendingTrans] = useState<Transaction[]>([]);
  const [historyTrans, setHistoryTrans] = useState<Transaction[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]); // New State
  const supabase = createClient();

  // Fetch Data
  const fetchData = async () => {
    console.log('Fetching admin data...');
    const res = await getAdminData();

    if (res.error) {
      console.error('Fetch Error:', res.error);
    } else {
      if (res.users) setPendingUsers(res.users);
      if (res.transactions) setPendingTrans(res.transactions as any);
      if (res.history) setHistoryTrans(res.history as any);
      if (res.proposals) setProposals(res.proposals as any); // Set proposals
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isUpdating, setIsUpdating] = useState(false);

  // Actions
  const approveUser = async (id: string) => {
    if (!confirm('Onaylamak istiyor musunuz?')) return;

    setIsUpdating(true);
    try {
      const res = await approveUserAction(id);
      if (res.error) {
        alert('HATA: ' + res.error);
      } else {
        alert('Başarılı! Kullanıcı onaylandı.');
        fetchData();
      }
    } catch (e: any) {
      alert('Kritik Hata: ' + e.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTransaction = async (id: number, status: 'approved' | 'rejected') => {
    const res = await handleTransactionAction(id, status);
    if (res.error) {
      alert('Error: ' + res.error);
    } else {
      fetchData();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu işlemi silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) return;

    const res = await deleteTransactionAction(id);
    if (res.error) {
      alert('Silme Hatası: ' + res.error);
    } else {
      alert('İşlem silindi.');
      fetchData();
    }
  };

  const handleDeleteProposal = async (id: number) => {
    if (!confirm('Bu öneriyi silmek istediğinize emin misiniz? Oylar da silinecek!')) return;

    const res = await deleteProposalAction(id);
    if (res.error) {
      alert('Silme Hatası: ' + res.error);
    } else {
      alert('Öneri silindi.');
      fetchData();
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. User Approvals */}
      <div className="bg-brand-dark/30 border border-brand-gold/20 p-4 rounded-lg">
        <h3 className="text-brand-gold font-mono text-sm mb-4">AGA ADAYLARI ({pendingUsers.length})</h3>
        {pendingUsers.length === 0 && <p className="text-brand-gray/40 text-xs">Onay bekleyen üye yok.</p>}
        {/* ... existing user list ... */}
        <ul className="space-y-3">
          {pendingUsers.map(user => (
            <li key={user.id} className="relative z-0 flex justify-between items-center bg-black/20 p-3 rounded border border-white/5">
              <span className="text-brand-gray font-medium">{user.username || 'Bilinmiyor'}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  approveUser(user.id);
                }}
                disabled={isUpdating}
                className="relative z-50 cursor-pointer flex items-center gap-2 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold px-4 py-2 rounded-full transition active:scale-95"
              >
                <Check size={16} />
                <span className="font-bold text-xs">{isUpdating ? '...' : 'ONAYLA'}</span>
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

      {/* 3. Proposals Management (New) */}
      <div className="bg-brand-dark/30 border border-brand-gold/30 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Vote className="text-brand-gold" size={16} />
          <h3 className="text-brand-gold font-mono text-sm">ANKET YÖNETİMİ</h3>
        </div>
        {proposals.length === 0 && <p className="text-brand-gray/40 text-xs">Aktif anket yok.</p>}
        <ul className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
          {proposals.map(p => (
            <li key={p.id} className="bg-black/20 p-3 rounded flex justify-between items-start border border-white/5">
              <p className="text-xs text-brand-gray/80 line-clamp-2 flex-1 mr-2">{p.content}</p>
              <button
                onClick={() => handleDeleteProposal(p.id)}
                className="text-red-900 hover:text-red-500 transition-colors p-1 shrink-0"
                title="Anketi Sil"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Transaction History */}
      <div className="bg-brand-dark/30 border border-brand-gray/10 p-4 rounded-lg opacity-80 hover:opacity-100 transition-opacity">
        <h3 className="text-brand-gray font-mono text-sm mb-4">İŞLEM GEÇMİŞİ (Son 50)</h3>
        {historyTrans.length === 0 && <p className="text-brand-gray/40 text-xs">Geçmiş işlem bulunamadı.</p>}
        <ul className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
          {historyTrans.map(t => (
            <li key={t.id} className="bg-black/10 p-2 rounded flex justify-between items-center text-xs border border-white/5">
              <div className="flex flex-col">
                <span className="text-brand-gray/80 font-bold">@{t.profiles?.username}</span>
                <span className={`text-[10px] ${t.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                  {t.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-brand-gray font-mono">₺{t.amount}</span>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-900 hover:text-red-500 transition-colors p-1"
                  title="Kalıcı Olarak Sil"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

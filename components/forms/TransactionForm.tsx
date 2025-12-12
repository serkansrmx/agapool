'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload } from 'lucide-react';

export default function TransactionForm({ userId }: { userId: string }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Insert Transaction Data
    const { error } = await supabase.from('transactions').insert({
      user_id: userId,
      amount: parseFloat(amount),
      type: 'deposit',
      status: 'pending', // Requires admin approval
      // proof_url: ... (File upload logic would go here, updating storage bucket)
    });

    setLoading(false);
    if (!error) {
      setSent(true);
      setAmount('');
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <Card className="bg-brand-dark/20 border-brand-lightGold/20 shadow-[0_0_15px_rgba(237,152,95,0.05)] backdrop-blur">
      <CardContent className="p-6">
        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-brand-gold font-mono tracking-wider">PARA GÖNDER</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-brand-gray/50">₺</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-8 bg-black/20 border-brand-gold/20 text-brand-gray focus-visible:ring-brand-gold/50 placeholder:text-brand-gray/20"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="bg-black/10 p-3 rounded border border-dashed border-brand-gray/20 text-center cursor-pointer hover:border-brand-gold/50 transition-colors group">
              <div className="flex flex-col items-center gap-1 text-brand-gray/50 group-hover:text-brand-gold/80 transition-colors">
                <Upload size={16} />
                <span className="text-xs">Dekont Yükle (Opsiyonel)</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-gold hover:bg-brand-lightGold text-brand-dark font-bold tracking-wide"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : 'DEKONT BİLDİR'}
            </Button>
            <p className="text-[10px] text-brand-gray/40 text-center font-mono">
              Fonlar: TR90 0000 0000 0000 0000 0000 00<br />
              Alici: TCK HAVUZ HESABI
            </p>
          </form>
        ) : (
          <div className="text-center py-6 animate-in fade-in zoom-in">
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="text-lg font-bold text-brand-lightGold">Bildirim Gönderildi!</h3>
            <p className="text-xs text-brand-gray/60">Yönetici onayı bekleniyor.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

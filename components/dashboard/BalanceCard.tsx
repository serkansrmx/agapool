import { createClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';

export default async function BalanceCard() {
  const supabase = await createClient();

  // Fetch all approved transactions
  const { data: transactions } = await supabase
    .from('transactions')
    .select('amount, type')
    .eq('status', 'approved');

  let total = 0;
  if (transactions) {
    total = transactions.reduce((acc, curr) => {
      return curr.type === 'deposit'
        ? acc + Number(curr.amount)
        : acc - Number(curr.amount);
    }, 0);
  }

  // Formatting currency
  const formatted = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0
  }).format(total);

  return (
    <Card className="bg-gradient-to-br from-brand-dark to-black border-brand-gold/30 overflow-hidden relative shadow-[0_0_30px_rgba(237,152,95,0.15)]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-[50px] rounded-full pointer-events-none" />
      <CardContent className="p-8 text-center space-y-2">
        <h2 className="text-brand-gray/60 text-sm font-mono tracking-[0.2em] uppercase">Güncel Havuz Bakiyesi</h2>
        <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-gold to-brand-lightGold drop-shadow-[0_0_15px_rgba(237,152,95,0.3)]">
          {formatted}
        </div>
        <p className="text-xs text-emerald-400 pt-2 animate-pulse font-mono">● Sistem Aktif</p>
      </CardContent>
    </Card>
  );
}

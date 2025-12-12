import { createClient } from '@/lib/supabase/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function Leaderboard() {
  const supabase = await createClient();

  // 1. Get all approved deposits
  const { data: deposits } = await supabase
    .from('transactions')
    .select('amount, user_id')
    .eq('type', 'deposit')
    .eq('status', 'approved');

  // 2. Get all profiles to map names
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, username, avatar_url');

  // 3. Aggregate data (Group by user_id)
  const totals: Record<string, number> = {};
  deposits?.forEach(d => {
    totals[d.user_id] = (totals[d.user_id] || 0) + Number(d.amount);
  });

  // 4. Sort and Map
  const leaderboard = Object.entries(totals)
    .sort(([, a], [, b]) => b - a) // Sort descending
    .map(([userId, amount]) => {
      const profile = profiles?.find(p => p.id === userId);
      return {
        id: userId,
        username: profile?.username || 'Unknown',
        avatar: profile?.avatar_url,
        amount,
      };
    })
    .slice(0, 5); // Top 5

  return (
    <div className="space-y-3">
      {leaderboard.map((user, index) => (
        <div key={user.id} className="flex items-center justify-between p-3 bg-brand-dark/40 border border-brand-gold/10 rounded-lg hover:border-brand-gold/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="font-mono text-xl text-brand-gold/50 w-6">#{index + 1}</div>
            <Avatar className="h-9 w-9 border border-brand-gold/20">
              <AvatarImage src={user.avatar || ''} />
              <AvatarFallback className="bg-brand-gold/20 text-brand-gold text-xs">{user.username[0]}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-brand-gray">{user.username}</span>
          </div>
          <span className="font-bold text-brand-lightGold font-mono">
            ₺{user.amount.toLocaleString()}
          </span>
        </div>
      ))}
      {leaderboard.length === 0 && <p className="text-brand-gray/40 text-sm text-center italic">Henüz katkı yapılmadı.</p>}
    </div>
  );
}

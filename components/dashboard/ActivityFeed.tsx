import { formatCurrency } from "@/lib/utils"

type Transaction = {
    id: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    note?: string; // Added note
    user_email?: string; // Ideally this would be fetched
}

export function ActivityFeed({ transactions }: { transactions: Transaction[] }) {
    return (
        <div className="h-full relative overflow-hidden">
            {/* Fade gradients */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

            <div className="space-y-6 animate-infinite-scroll p-4">
                {/* Looping content */}
                {transactions.concat(transactions).map((tx, i) => (
                    <div key={`${tx.id}-${i}`} className="flex flex-col gap-1 text-sm bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                        <div className="flex justify-between items-baseline">
                            <span className="font-bold text-brand-gold">{tx.user_email || 'Anonim'}</span>
                            <span className="text-[10px] text-white/30">{new Date(tx.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-white/70 italic text-xs">{tx.note || 'Açıklama yok'}</p>
                        <div className="text-right text-green-400 font-mono font-bold">
                            +{formatCurrency(tx.amount)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

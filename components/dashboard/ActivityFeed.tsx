import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
        <Card className="col-span-4 max-h-[500px] overflow-hidden relative">
            <CardHeader className="bg-background z-10 relative">
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="relative">
                {/* Gradient Masks for fade effect */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

                <div className="space-y-4 animate-infinite-scroll">
                    {/* First copy */}
                    {transactions.concat(transactions).map((tx, i) => (
                        <div key={`${tx.id}-${i}`} className="flex items-start p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium leading-none">{tx.user_email || 'Anonim Aga'}</p>
                                    <span className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-sm text-muted-foreground italic">{tx.note || 'No note'}</p>
                                    <div className="font-bold text-green-500">
                                        +{formatCurrency(tx.amount)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

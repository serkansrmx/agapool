import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

type Transaction = {
    id: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

export function ActivityFeed({ transactions }: { transactions: Transaction[] }) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {transactions.map(tx => (
                        <div key={tx.id} className="flex items-center">
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">Transaction</p>
                                <p className="text-sm text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="ml-auto font-medium">
                                {tx.status === 'approved' ? '+' : ''}{formatCurrency(tx.amount)}
                                <span className="ml-2 text-xs text-muted-foreground">({tx.status})</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

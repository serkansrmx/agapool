import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

type Transaction = {
    id: string;
    user_id: string; // In real app, join with users table to get name
    amount: number;
    created_at: string;
    status: 'pending'; // This component only shows pending
}

export function TransactionReview({ transactions }: { transactions: Transaction[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaction Review</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {transactions.map(tx => (
                        <div key={tx.id} className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Request: {formatCurrency(tx.amount)}</p>
                                <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="space-x-2">
                                <Button size="sm" variant="default">Approve</Button>
                                <Button size="sm" variant="destructive">Reject</Button>
                            </div>
                        </div>
                    ))}
                    {transactions.length === 0 && <p className="text-sm text-muted-foreground">No pending transactions.</p>}
                </div>
            </CardContent>
        </Card>
    )
}

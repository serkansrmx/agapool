import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type User = {
    id: string;
    email: string;
    created_at: string;
}

export function PendingUsers({ users }: { users: User[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pending Users</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {users.map(user => (
                        <div key={user.id} className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">{user.email}</p>
                                <p className="text-xs text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="space-x-2">
                                <Button size="sm" variant="default">Approve</Button>
                                <Button size="sm" variant="destructive">Reject</Button>
                            </div>
                        </div>
                    ))}
                    {users.length === 0 && <p className="text-sm text-muted-foreground">No pending users.</p>}
                </div>
            </CardContent>
        </Card>
    )
}

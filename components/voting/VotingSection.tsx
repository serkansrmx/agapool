'use client';

import { useState } from 'react';
import { createProposal, toggleVote } from '@/app/actions/voting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThumbsUp, Loader2, Plus, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Proposal {
    id: number;
    content: string;
    user_id: string;
    voteCount: number;
    hasVoted: boolean;
    profiles?: { username: string };
}

export default function VotingSection({ initialProposals }: { initialProposals: Proposal[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [newProposal, setNewProposal] = useState('');

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProposal.trim()) return;

        setLoading(true);
        console.log('Sending proposal:', newProposal);

        const res = await createProposal(newProposal);
        setLoading(false);

        if (res.error) {
            alert('HATA: ' + res.error);
        } else {
            console.log('Proposal added, refreshing...');
            setNewProposal('');
            router.refresh();
            // Fallback: If router.refresh() doesn't show it immediately, maybe we need to fetch manually? 
            // For now let's rely on refresh but if it fails again we might need a manual fetch.
        }
    };

    const handleVote = async (id: number) => {
        // Optimistic UI update could be done here, but for simplicity we'll wait for refresh
        const res = await toggleVote(id);
        if (!res.error) {
            router.refresh();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-brand-gold" size={20} />
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-lightGold">
                    AGALARIN SEÇİMİ
                </h2>
            </div>

            {/* Add Proposal Form */}
            <form onSubmit={handleAdd} className="flex gap-2 relative z-10">
                <Input
                    placeholder="Bu parayla ne yapılsın? Fikrini yaz..."
                    value={newProposal}
                    onChange={(e) => setNewProposal(e.target.value)}
                    className="bg-brand-dark/50 border-brand-gray/20 text-brand-gray focus:ring-brand-gold/30"
                />
                <Button
                    type="submit"
                    disabled={loading || !newProposal.trim()}
                    className="bg-brand-gold hover:bg-brand-lightGold text-brand-dark"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Plus />}
                </Button>
            </form>

            {/* List */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {initialProposals.length === 0 && (
                    <p className="text-center text-brand-gray/30 py-4 italic">Henüz bir öneri yok. İlk sen yaz!</p>
                )}

                {initialProposals.map((p) => (
                    <div
                        key={p.id}
                        className={`p-4 rounded-xl border transition-all ${p.hasVoted
                            ? 'bg-brand-gold/10 border-brand-gold/30 shadow-[0_0_10px_rgba(237,152,95,0.1)]'
                            : 'bg-black/20 border-white/5 hover:border-white/10'
                            }`}
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <p className="text-brand-gray/90 text-sm leading-relaxed">{p.content}</p>
                                <p className="text-[10px] text-brand-gray/40 mt-2 font-mono">
                                    @{p.profiles?.username || 'Gizli Aga'}
                                </p>
                            </div>

                            <button
                                onClick={() => handleVote(p.id)}
                                className={`flex flex-col items-center gap-1 min-w-[50px] p-2 rounded-lg transition-colors ${p.hasVoted
                                    ? 'text-brand-gold bg-brand-gold/10'
                                    : 'text-brand-gray/30 hover:text-brand-gray/60 hover:bg-white/5'
                                    }`}
                            >
                                <ThumbsUp size={20} className={p.hasVoted ? 'fill-current' : ''} />
                                <span className="text-xs font-bold">{p.voteCount}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

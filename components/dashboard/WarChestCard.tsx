import { Landmark, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { formatCurrency } from "@/lib/utils";

export function WarChestCard() {
    return (
        <div className="bg-dark-card rounded-2xl p-6 col-span-1 lg:col-span-2 relative overflow-hidden border border-gray-800/50">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium uppercase tracking-wider">
                    <Landmark className="w-5 h-5" />
                    TOTAL WAR CHEST
                </div>
                <span className="text-xs font-bold text-accent-green bg-green-900/30 px-2 py-1 rounded border border-green-900/50">+4.5% this week</span>
            </div>

            <div className="text-5xl font-bold text-white mb-2">{formatCurrency(12450)}</div>
            <p className="text-gray-500 text-sm mb-6">Last updated: Just now</p>

            <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-lg border border-white/10 transition-all">
                    <ArrowUpRight className="w-4 h-4" /> Send
                </button>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-lg border border-white/10 transition-all">
                    <ArrowDownLeft className="w-4 h-4" /> Request
                </button>
            </div>
        </div>
    )
}

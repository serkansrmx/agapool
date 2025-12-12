import { ArrowUpRight, ArrowDownLeft, Landmark } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function WarChestCard() {
    return (
        <div className="col-span-12 md:col-span-8 bg-brand-card rounded-3xl p-8 relative overflow-hidden border border-white/5">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 text-brand-text text-sm font-medium tracking-wide">
                        <Landmark className="w-4 h-4" />
                        TOTAL WAR CHEST
                    </div>
                    <div className="bg-brand-neonGreen/10 text-brand-neonGreen text-xs font-bold px-3 py-1 rounded-full">
                        +4.5% this week
                    </div>
                </div>

                <h2 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                    {formatCurrency(12450)}
                </h2>
                <p className="text-brand-text text-sm mb-8">Last updated: Just now</p>

                <div className="flex gap-4">
                    <Button className="h-12 px-8 bg-brand-card border border-white/10 hover:bg-white/5 text-white rounded-xl flex items-center gap-2 transition-all">
                        <ArrowUpRight className="w-5 h-5 text-brand-neonGreen" />
                        Send
                    </Button>
                    <Button className="h-12 px-8 bg-brand-card border border-white/10 hover:bg-white/5 text-white rounded-xl flex items-center gap-2 transition-all">
                        <ArrowDownLeft className="w-5 h-5 text-brand-purple" />
                        Request
                    </Button>
                </div>
            </div>
        </div>
    )
}

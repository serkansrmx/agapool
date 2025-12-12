import { Sailboat } from 'lucide-react';

export function TargetCard() {
    return (
        <div className="col-span-12 md:col-span-4 bg-brand-card rounded-3xl p-6 relative overflow-hidden border border-white/5 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Sailboat className="text-white w-6 h-6" />
                    </div>
                    <div className="text-right">
                        <p className="text-white font-bold text-lg">$15,000</p>
                        <p className="text-brand-text text-xs">Target Goal</p>
                    </div>
                </div>

                <h3 className="text-white font-bold text-lg leading-tight mb-1">Bodrum Yacht Trip</h3>
                <p className="text-brand-text text-xs mb-6">Summer '25 Allocation</p>
            </div>

            <div>
                <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-bold text-white">83%</span>
                    <span className="text-sm text-brand-text">$2,550 left</span>
                </div>

                <div className="h-3 bg-brand-dark rounded-full overflow-hidden flex">
                    <div className="w-[83%] h-full bg-gradient-to-r from-brand-purple to-cyan-400 rounded-full shadow-[0_0_15px_rgba(108,93,211,0.5)]" />
                </div>
                <p className="text-xs text-brand-text text-center mt-4">Projected completion: 12 Days</p>
            </div>
        </div>
    )
}

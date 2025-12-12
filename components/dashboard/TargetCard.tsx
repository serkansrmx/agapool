import { Sailboat } from 'lucide-react';

export function TargetCard() {
    return (
        <div className="bg-dark-card rounded-2xl p-6 col-span-1 border border-gray-800/50 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-900/40 rounded-xl flex items-center justify-center text-cyan-400">
                    <Sailboat className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h3 className="text-white font-bold leading-tight">Bodrum Yacht Trip</h3>
                    <div className="flex justify-between text-xs text-gray-400 w-full mt-1">
                        <span>Target Goal</span>
                        <span className="text-white font-bold">$15,000</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold text-white">83%</span>
                <span className="text-sm text-gray-400">$2,550 left</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700/50 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-gradient-to-r from-accent-purple to-cyan-400 h-full rounded-full" style={{ width: '83%' }}></div>
            </div>
            <p className="text-xs text-gray-500 text-center">Projected completion: 12 Days</p>
        </div>
    )
}

import { Crown } from 'lucide-react';

export function TopAgalar() {
    return (
        <div className="bg-dark-card rounded-2xl p-6 col-span-1 border border-gray-800/50">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-white font-bold">
                    <Crown className="text-yellow-500 w-5 h-5 fill-yellow-500" /> Top Agalar
                </div>
                <span className="text-xs text-accent-purple hover:underline cursor-pointer">View All</span>
            </div>

            <div className="space-y-4">
                {/* Item 1 */}
                <div className="flex items-center bg-[#211B30] p-3 rounded-xl border border-yellow-500/30 relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1 bg-yellow-500"></div>
                    <span className="text-yellow-500 font-bold italic mr-3 text-lg">#1</span>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Baris" className="w-10 h-10 rounded-full border border-gray-600" />
                    <div className="ml-3">
                        <p className="text-white text-sm font-bold">Baris</p>
                        <p className="text-[10px] text-yellow-500 uppercase">THE WHALE</p>
                    </div>
                    <div className="ml-auto font-bold text-white">$3,200</div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center bg-white/5 p-3 rounded-xl">
                    <span className="text-gray-400 font-bold italic mr-3 text-lg">#2</span>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emre" className="w-10 h-10 rounded-full border border-gray-600" />
                    <div className="ml-3">
                        <p className="text-white text-sm font-bold">Emre</p>
                        <p className="text-[10px] text-gray-400">Contributor</p>
                    </div>
                    <div className="ml-auto font-bold text-white">$2,800</div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center bg-white/5 p-3 rounded-xl">
                    <span className="text-orange-700 font-bold italic mr-3 text-lg">#3</span>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Can" className="w-10 h-10 rounded-full border border-gray-600" />
                    <div className="ml-3">
                        <p className="text-white text-sm font-bold">Can</p>
                        <p className="text-[10px] text-gray-400">Member</p>
                    </div>
                    <div className="ml-auto font-bold text-white">$1,500</div>
                </div>
            </div>
        </div>
    )
}

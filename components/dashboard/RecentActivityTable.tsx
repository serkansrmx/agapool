import { ArrowDownLeft, SlidersHorizontal } from 'lucide-react';

export function RecentActivityTable() {
    return (
        <div className="bg-dark-card rounded-2xl p-6 border border-gray-800/50">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                <SlidersHorizontal className="text-gray-400 w-5 h-5 cursor-pointer hover:text-white" />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase border-b border-gray-800">
                        <tr>
                            <th className="py-3 font-medium text-left">Transaction</th>
                            <th className="py-3 font-medium text-left">User</th>
                            <th className="py-3 font-medium text-left">Date</th>
                            <th className="py-3 font-medium text-left">Status</th>
                            <th className="py-3 font-medium text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                        {/* Row 1 */}
                        <tr className="group hover:bg-white/5 transition-colors">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-green-900/30 flex items-center justify-center text-green-500">
                                        <ArrowDownLeft className="w-4 h-4" />
                                    </div>
                                    <span className="text-white font-medium">Monthly Contribution</span>
                                </div>
                            </td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Baris" className="w-6 h-6 rounded-full" />
                                    <span className="text-gray-300">Baris</span>
                                </div>
                            </td>
                            <td className="py-4 text-gray-400">Today, 10:42 AM</td>
                            <td className="py-4">
                                <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs border border-green-900/50">Completed</span>
                            </td>
                            <td className="py-4 text-right font-bold text-green-400">+$250.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

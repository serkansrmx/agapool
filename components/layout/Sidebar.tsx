import Link from 'next/link';
// Using Lucide icons to match the design requirements
import { ShieldCheck as ShieldIcon, LayoutGrid, Wallet as WalletIcon, Trophy as TrophyIcon, History, Settings, Megaphone as MegaphoneIcon, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";

const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/' },
    { icon: WalletIcon, label: 'Wallet', href: '/wallet' },
    { icon: TrophyIcon, label: 'Leaderboard', href: '/leaderboard' },
    { icon: History, label: 'History', href: '/history' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
    return (
        <aside className="w-64 bg-dark-sidebar flex flex-col border-r border-gray-800/30 h-screen fixed">
            {/* Logo */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    <ShieldIcon className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg leading-tight">TCK Agalar</h1>
                    <p className="text-xs text-gray-500">POOL MANAGER</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${item.label === 'Dashboard'
                            ? 'text-white bg-[rgba(127,58,240,0.15)] border-l-[3px] border-accent-purple'
                            : 'text-gray-300 hover:bg-white/5'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 ${item.label === 'Dashboard' ? 'text-accent-purple' : ''}`} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 mt-auto">
                {/* Proposal Card */}
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-b from-[#1E182F] to-[#151020] border border-gray-800/50">
                    <div className="flex items-center gap-2 mb-2 text-white">
                        <MegaphoneIcon className="text-blue-400 w-4 h-4" />
                        <span className="font-bold text-sm">PROPOSAL</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">Vote on the next venue for the Summer '24 trip.</p>
                    <button className="w-full bg-accent-purple hover:bg-accent-purpleLight text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                        Vote Now
                    </button>
                </div>

                {/* User Profile */}
                <div className="pt-4 border-t border-gray-800/30 flex items-center gap-3">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Cem" alt="Cem" className="w-10 h-10 rounded-full border-2 border-gray-700" />
                    <div>
                        <p className="text-white text-sm font-semibold">Cem</p>
                        <p className="text-xs text-gray-500 cursor-pointer hover:text-white">View Profile</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

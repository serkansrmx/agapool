import Link from 'next/link';
import { LayoutDashboard, Wallet, Trophy, History, Settings, LogOut, Disc } from 'lucide-react';
import { Button } from "@/components/ui/button";

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Wallet, label: 'Wallet', href: '/wallet' },
    { icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
    { icon: History, label: 'History', href: '/history' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
    return (
        <div className="h-screen w-64 bg-brand-card flex flex-col border-r border-white/5 fixed left-0 top-0 z-50">
            {/* Logo */}
            <div className="p-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-purple to-brand-neonRequest flex items-center justify-center">
                    <Disc className="text-white w-6 h-6 spin-slow" />
                </div>
                <div>
                    <h1 className="font-bold text-white text-lg leading-none">TCK Agalar</h1>
                    <span className="text-xs text-brand-text">POOL MANAGER</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${item.label === 'Dashboard'
                                ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/25'
                                : 'text-brand-text hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 mt-auto space-y-4">
                {/* Proposal CTA */}
                <div className="bg-gradient-to-br from-brand-card to-brand-dark border border-white/5 p-4 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-purple/20 blur-2xl rounded-full -mr-10 -mt-10" />
                    <h3 className="text-white font-bold mb-1 relative z-10">PROPOSAL</h3>
                    <p className="text-xs text-brand-text mb-3 relative z-10">Vote on the next venue for the Summer '25 trip.</p>
                    <Button size="sm" className="w-full bg-brand-purple hover:bg-brand-purpleLight text-white border-0">
                        Vote Now
                    </Button>
                </div>

                {/* User Profile Stub (Logout) */}
                <div className="flex items-center gap-3 px-2 pt-2 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full bg-brand-gray/10 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">Cem</p>
                        <button className="text-xs text-brand-text hover:text-red-400 flex items-center gap-1 transition-colors">
                            <LogOut className="w-3 h-3" /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

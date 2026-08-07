import React, { useState, useEffect } from 'react';
import { Search, Eye, Users, Download } from 'lucide-react';
import mockDb from '../mockDb';

// Components
import UserPurchasesModal from '../modal/UserPurchasesModal';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const fmt = (n) => new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

    const loadData = () => {
        setUsers(mockDb.getUsers());
        setOrders(mockDb.getOrders());
    };

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            loadData();
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    // Helpers to compute statistics per user
    const getUserStats = (userId) => {
        const userOrders = orders.filter(o => o.userId === userId);
        const orderCount = userOrders.length;
        const totalSpent = userOrders.reduce((sum, order) => {
            let value = 0;
            if (typeof order.total === 'number') {
                value = order.total;
            } else if (typeof order.total === 'string') {
                value = parseFloat(order.total.replace(/[^0-9.]/g, '')) || 0;
            }
            return sum + value;
        }, 0);

        return {
            orders: userOrders,
            count: orderCount,
            spent: totalSpent
        };
    };

    // Filter users list based on name or email search
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // CSV Exporter
    const handleCSVExport = () => {
        const headers = ['User ID', 'Name', 'Email', 'Phone', 'Joined Date', 'Orders Count', 'Total Spent (NGN)'];
        const rows = filteredUsers.map(u => {
            const stats = getUserStats(u.id);
            return [
                u.id,
                `"${u.name.replace(/"/g, '""')}"`,
                u.email,
                u.phone || '',
                u.joinedDate || '',
                stats.count,
                stats.spent.toFixed(2)
            ];
        });

        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `customers_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewPurchases = (user) => {
        setSelectedUser(user);
        setIsDrawerOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[55vh] gap-3">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Loading user directory...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-12">
            
            {/* ── Search and CSV Export tools ── */}
            <div className="flex items-center gap-2 select-none">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search directory by profile name or email..."
                        className="w-full h-11 pl-11 pr-4 bg-white/70 focus:bg-white text-slate-800 text-xs font-bold rounded-xl border border-slate-100/60 focus:border-slate-355 focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-semibold"
                    />
                </div>
                <button
                    onClick={handleCSVExport}
                    className="h-11 px-4 rounded-xl bg-white border border-slate-100 flex items-center justify-center gap-2 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer shrink-0 text-xs font-bold uppercase tracking-wider"
                    title="Export CSV Report"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export CSV</span>
                </button>
            </div>

            {/* ── Ledger Directory list ── */}
            {filteredUsers.length > 0 ? (
                <div className="flex flex-col border-t border-slate-150/60 mt-1">
                    {filteredUsers.map((user) => {
                        const stats = getUserStats(user.id);
                        return (
                            <div
                                key={user.id}
                                className="flex items-center justify-between py-4 border-b border-slate-100/60 hover:bg-slate-50/10 px-1 transition-all group select-none"
                            >
                                {/* Left: Avatar + Identity details */}
                                <div className="flex items-center gap-4 flex-grow mr-4 min-w-0">
                                    <img
                                        src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100'}
                                        alt={user.name}
                                        className="w-11 h-11 rounded-full object-cover border border-slate-100/60 bg-slate-50 shrink-0"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="text-xs sm:text-sm font-bold text-slate-855 leading-tight group-hover:text-black transition-colors truncate">
                                            {user.name}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                                            <span className="truncate max-w-[150px] sm:max-w-none">{user.email}</span>
                                            <span className="text-slate-250 font-normal">·</span>
                                            <span>{user.phone || 'No Phone'}</span>
                                            <span className="text-slate-250 font-normal">·</span>
                                            <span>Joined {user.joinedDate || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Stats summary & Action */}
                                <div className="flex items-center gap-4 shrink-0">
                                    <div className="flex flex-col gap-0.5 items-end text-right">
                                        <span className="text-xs font-black text-slate-900">₦{fmt(stats.spent)}</span>
                                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                                            {stats.count} {stats.count === 1 ? 'order' : 'orders'}
                                        </span>
                                    </div>

                                    {/* Action Link to Drawer */}
                                    <button
                                        onClick={() => handleViewPurchases(user)}
                                        className="p-1.5 bg-transparent hover:text-slate-900 text-slate-400 transition-colors cursor-pointer border-none rounded-none"
                                        title="View Purchase Logs"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-[0_2px_8px_rgba(15,23,42,0.01)] select-none">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">No customers match your search criteria.</p>
                </div>
            )}

            {/* User Purchases Slide-over Drawer */}
            {selectedUser && (
                <UserPurchasesModal
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    user={selectedUser}
                    userOrders={getUserStats(selectedUser.id).orders}
                />
            )}
        </div>
    );
}

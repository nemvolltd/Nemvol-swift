import React, { useState } from 'react';
import { Search, Eye, Users, ShoppingBag, DollarSign, Download } from 'lucide-react';
import UserPurchasesDrawer from './UserPurchasesDrawer';

export default function UsersTab({ users = [], orders = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Helpers to compute statistics per user
    const getUserStats = (userId) => {
        const userOrders = orders.filter(o => o.userId === userId);
        const orderCount = userOrders.length;
        const totalSpent = userOrders.reduce((sum, order) => {
            const price = parseFloat(order.total?.replace('$', '') || 0);
            return sum + price;
        }, 0);

        return {
            orders: userOrders,
            count: orderCount,
            spent: `$${totalSpent.toFixed(2)}`
        };
    };

    // Filter users list based on name or email search
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // CSV Exporter
    const handleCSVExport = () => {
        const headers = ['User ID', 'Name', 'Email', 'Phone', 'Joined Date', 'Orders Count', 'Total Spent'];
        const rows = filteredUsers.map(u => {
            const stats = getUserStats(u.id);
            return [
                u.id,
                `"${u.name.replace(/"/g, '""')}"`,
                u.email,
                u.phone,
                u.joinedDate,
                stats.count,
                stats.spent.replace('$', '')
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

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Tab Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1">Customer Base</h2>
                    <p className="text-slate-500 text-xs md:text-sm">Manage registered profiles and inspect checkout logs.</p>
                </div>
                <button
                    onClick={handleCSVExport}
                    className="h-11 px-4 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-200 transition-all flex items-center gap-2"
                    title="Download CSV report"
                >
                    <Download className="w-4 h-4 text-slate-500" />
                    <span className="hidden sm:inline">Export CSV</span>
                </button>
            </div>

            {/* Filter controls */}
            <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full h-11 pl-11 pr-4 border border-slate-200/80 bg-slate-50/50 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 transition-all duration-300"
                />
            </div>

            {/* Users Directory */}
            {filteredUsers.length > 0 ? (
                <>
                    {/* Desktop View */}
                    <div className="hidden md:block bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Orders</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Total Spent</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Purchases</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredUsers.map((user) => {
                                    const stats = getUserStats(user.id);
                                    return (
                                        <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                                            <td className="p-4 flex items-center gap-3">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-9 h-9 rounded-full object-cover border border-slate-100"
                                                />
                                                <span className="text-xs font-black text-slate-900">{user.name}</span>
                                            </td>
                                            <td className="p-4 text-xs text-slate-600 font-semibold">{user.email}</td>
                                            <td className="p-4 text-xs text-slate-500 font-medium">{user.phone}</td>
                                            <td className="p-4 text-xs text-slate-400 font-semibold">{user.joinedDate}</td>
                                            <td className="p-4 text-xs font-extrabold text-slate-800 text-right">{stats.count}</td>
                                            <td className="p-4 text-xs font-black text-blue-600 text-right">{stats.spent}</td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleViewPurchases(user)}
                                                    className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors ml-auto"
                                                    title="View purchases"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="flex flex-col gap-4 md:hidden">
                        {filteredUsers.map((user) => {
                            const stats = getUserStats(user.id);
                            return (
                                <div key={user.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover border border-slate-100"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-900">{user.name}</span>
                                                <span className="text-[10px] text-slate-400 font-medium">{user.email}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleViewPurchases(user)}
                                            className="h-8 px-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1.5 text-slate-600 hover:bg-slate-100 text-[10px] font-bold uppercase tracking-wider transition-colors"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            History
                                        </button>
                                    </div>

                                    <div className="h-px bg-slate-50"></div>

                                    {/* Stats grid */}
                                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                                        <div>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Joined</span>
                                            <span className="text-[10px] font-black text-slate-700">{user.joinedDate}</span>
                                        </div>
                                        <div>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Orders</span>
                                            <span className="text-[10px] font-black text-slate-700">{stats.count}</span>
                                        </div>
                                        <div>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Spent</span>
                                            <span className="text-[10px] font-black text-blue-600">{stats.spent}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="border-2 border-dashed border-slate-100 rounded-3xl p-12 text-center bg-white">
                    <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mb-1">No customers matched</h3>
                    <p className="text-slate-400 text-xs max-w-xs mx-auto">We couldn't find any profiles matching your search query. Try typing a different name or email.</p>
                </div>
            )}

            {/* User Purchases Slide-over Drawer */}
            {selectedUser && (
                <UserPurchasesDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    user={selectedUser}
                    userOrders={getUserStats(selectedUser.id).orders}
                />
            )}
        </div>
    );
}

import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

export default function RecentTransactions({ orders = [] }) {
    const [filter, setFilter] = useState('weekly');

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    const formatDateString = (isoString) => {
        if (!isoString) return 'Today';
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });
        } catch (e) {
            return isoString;
        }
    };

    const now = new Date();
    const filteredByPeriod = orders.filter(order => {
        if (filter === 'today') {
            const d = new Date(order.createdAt || order.date);
            return d.toDateString() === now.toDateString();
        }
        if (filter === 'weekly') {
            const d = new Date(order.createdAt || order.date);
            return !isNaN(d) && (now - d) / (1000 * 60 * 60 * 24) <= 7;
        }
        return true; // monthly = all
    });
    const displayOrders = filteredByPeriod.slice(0, 5);


    return (
        <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 text-slate-800 rounded-xl">
                        <ShoppingBag className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Checkouts</h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">Real-time purchase activity.</p>
                    </div>
                </div>

                <div className="flex bg-slate-50/80 p-0.5 border border-slate-100 rounded-xl self-start sm:self-auto select-none">
                    {['today', 'weekly', 'monthly'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                                filter === tab
                                    ? 'bg-white text-slate-900 shadow-sm border border-slate-100/90'
                                    : 'text-slate-400 hover:text-slate-650'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            {displayOrders.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {displayOrders.map((order) => {
                        const userName = order.shippingAddress?.name || order.user?.name || 'Customer';
                        const firstItem = order.items?.[0];
                        const itemImage = firstItem?.product?.image;
                        const itemName = firstItem?.product?.name || 'Product';
                        
                        const itemText = order.items?.length > 1
                            ? `${itemName} + ${order.items.length - 1} more`
                            : `${itemName} (x${firstItem?.quantity || 1})`;

                        const total = typeof order.total === 'number'
                            ? `₦${order.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : String(order.total).replace('$', '₦');

                        return (
                            <div 
                                key={order.id} 
                                className="flex items-center justify-between p-2 hover:bg-slate-50/60 transition-all duration-200 rounded-2xl border border-transparent hover:border-slate-100/60 group gap-3 min-w-0"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    {/* Thumbnail Preview or Initials */}
                                    {itemImage ? (
                                        <img 
                                            src={itemImage} 
                                            alt={itemName} 
                                            className="w-11 h-11 object-cover rounded-xl border border-slate-100/80 shadow-sm shrink-0"
                                        />
                                    ) : (
                                        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                                            {getInitials(userName)}
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-0.5 min-w-0 text-left">
                                        <h4 className="text-xs font-black text-slate-900 group-hover:text-black transition-colors truncate">
                                            {itemName}
                                        </h4>
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-[10px] font-bold text-slate-600 truncate max-w-[100px] sm:max-w-none">
                                                {userName}
                                            </span>
                                            <span className="text-[9.5px] font-bold text-slate-400">
                                                • {formatDateString(order.created_at || order.date)}
                                            </span>
                                        </div>
                                        <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider">
                                            {itemText}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1 select-none shrink-0">
                                    <span className="text-xs font-black text-slate-950 group-hover:text-blue-600 transition-colors">
                                        {total}
                                    </span>
                                    <StatusBadge status={order.status} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="py-12 text-center text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    No recent checkouts.
                </div>
            )}
        </div>
    );
}

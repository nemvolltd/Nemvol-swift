import React, { useState, useEffect } from 'react';
import {
    Bell, CheckCheck, Trash2, ShoppingBag,
    AlertTriangle, ShieldCheck, UserRound,
    Info, ChevronRight, Circle
} from 'lucide-react';
import OrderDetailsModal from '../modal/OrderDetailsModal';
import mockDb from '../mockDb';

const INITIAL_NOTIFICATIONS = [
    {
        id: 'notif-1',
        type: 'order',
        title: 'New Order Received',
        message: 'Order #ORD-84920 has been placed and is awaiting fulfillment.',
        meta: '₦184,500.00',
        timestamp: '10 mins ago',
        read: false,
        referenceId: 'ORD-84920'
    },
    {
        id: 'notif-2',
        type: 'stock',
        title: 'Low Inventory Warning',
        message: '"Indigo Classic Jacket" is critically low — only 3 units remain in stock.',
        meta: '3 units left',
        timestamp: '2 hours ago',
        read: false,
    },
    {
        id: 'notif-3',
        type: 'security',
        title: 'Payout Settings Updated',
        message: 'Merchant bank account details were modified and saved successfully.',
        meta: 'GTBank · ****6789',
        timestamp: '5 hours ago',
        read: true
    },
    {
        id: 'notif-4',
        type: 'customer',
        title: 'New Customer Signup',
        message: 'A new account was registered on the storefront.',
        meta: 'salung@admin.com',
        timestamp: 'Yesterday',
        read: true
    },
    {
        id: 'notif-5',
        type: 'order',
        title: 'Order Delivered',
        message: 'Order #ORD-72901 has been marked as delivered by the logistics partner.',
        meta: '₦67,000.00',
        timestamp: '2 days ago',
        read: true,
        referenceId: 'ORD-72901'
    }
];

const TYPE_CONFIG = {
    order: {
        icon: ShoppingBag,
        iconBg: 'bg-slate-900',
        iconColor: 'text-white',
        dot: 'bg-slate-900',
        badge: 'bg-slate-100 text-slate-700',
        label: 'Orders',
    },
    stock: {
        icon: AlertTriangle,
        iconBg: 'bg-amber-500',
        iconColor: 'text-white',
        dot: 'bg-amber-500',
        badge: 'bg-amber-50 text-amber-700',
        label: 'Stock',
    },
    security: {
        icon: ShieldCheck,
        iconBg: 'bg-blue-600',
        iconColor: 'text-white',
        dot: 'bg-blue-600',
        badge: 'bg-blue-50 text-blue-700',
        label: 'Security',
    },
    customer: {
        icon: UserRound,
        iconBg: 'bg-indigo-600',
        iconColor: 'text-white',
        dot: 'bg-indigo-600',
        badge: 'bg-indigo-50 text-indigo-700',
        label: 'Customers',
    },
    default: {
        icon: Info,
        iconBg: 'bg-slate-400',
        iconColor: 'text-white',
        dot: 'bg-slate-400',
        badge: 'bg-slate-50 text-slate-600',
        label: 'System',
    },
};

const FILTERS = [
    { key: 'all',      label: 'All' },
    { key: 'order',    label: 'Orders' },
    { key: 'stock',    label: 'Stock' },
    { key: 'security', label: 'Security' },
    { key: 'customer', label: 'Customers' },
];

export default function AdminNotifications() {
    const [notifications, setNotifications] = useState(() => {
        const stored = localStorage.getItem('admin_notifications');
        return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    });
    const [filter, setFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('admin_notifications', JSON.stringify(notifications));
    }, [notifications]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkRead = (id) =>
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

    const handleMarkAllRead = () =>
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    const handleDelete = (id, e) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleClearAll = () => setNotifications([]);

    const handleClick = (n) => {
        handleMarkRead(n.id);
        if (n.type === 'order' && n.referenceId) {
            const order = mockDb.getOrders().find(o => o.id === n.referenceId);
            if (order) { setSelectedOrder(order); setIsOrderModalOpen(true); }
        }
    };

    const filtered = notifications.filter(n => filter === 'all' || n.type === filter);
    const unreadFiltered = filtered.filter(n => !n.read);
    const readFiltered = filtered.filter(n => n.read);

    return (
        <div className="flex flex-col gap-5 animate-fadeIn pb-16 select-none max-w-2xl mx-auto w-full">

            {/* ── Summary Row ── */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {unreadCount > 0
                            ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                            : 'All caught up'}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllRead}
                            className="h-8 px-3.5 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-slate-900 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 bg-white"
                        >
                            <CheckCheck className="w-3.5 h-3.5" />
                            Mark all read
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="h-8 px-3.5 rounded-lg text-slate-400 hover:text-rose-500 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 border-none bg-transparent"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* ── Filter Tabs (underline style) ── */}
            <div className="flex items-center gap-0 border-b border-slate-150 overflow-x-auto scrollbar-none">
                {FILTERS.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={`relative h-10 px-4 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border-none bg-transparent ${
                            filter === key
                                ? 'text-slate-900'
                                : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        {label}
                        {key !== 'all' && notifications.filter(n => n.type === key && !n.read).length > 0 && (
                            <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-900 text-white text-[7px] font-black">
                                {notifications.filter(n => n.type === key && !n.read).length}
                            </span>
                        )}
                        {filter === key && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 rounded-t-sm" />
                        )}
                    </button>
                ))}
            </div>

            {/* ── Notification Groups ── */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                        <Bell className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">No notifications here.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">

                    {/* Unread group */}
                    {unreadFiltered.length > 0 && (
                        <div className="flex flex-col gap-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1 mb-2">
                                Unread
                            </p>
                            {unreadFiltered.map(n => (
                                <NotificationRow
                                    key={n.id}
                                    n={n}
                                    onClick={() => handleClick(n)}
                                    onDelete={(e) => handleDelete(n.id, e)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Read group */}
                    {readFiltered.length > 0 && (
                        <div className="flex flex-col gap-1">
                            {unreadFiltered.length > 0 && (
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1 mb-2">
                                    Earlier
                                </p>
                            )}
                            {readFiltered.map(n => (
                                <NotificationRow
                                    key={n.id}
                                    n={n}
                                    onClick={() => handleClick(n)}
                                    onDelete={(e) => handleDelete(n.id, e)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            <OrderDetailsModal
                isOpen={isOrderModalOpen}
                onClose={() => { setIsOrderModalOpen(false); setSelectedOrder(null); }}
                order={selectedOrder}
            />
        </div>
    );
}

// ── Single Row Component ────────────────────────────────────────────
function NotificationRow({ n, onClick, onDelete }) {
    const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.default;
    const Icon = cfg.icon;
    const isOrder = n.type === 'order' && n.referenceId;

    return (
        <div
            onClick={onClick}
            className={`group flex items-start gap-4 px-4 py-4 rounded-2xl transition-all cursor-pointer ${
                !n.read
                    ? 'bg-white border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
                    : 'hover:bg-slate-50/60'
            }`}
        >
            {/* Icon */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.iconBg} ${cfg.iconColor}`}>
                <Icon className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 text-left flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                    <h4 className={`text-[12px] leading-tight truncate ${!n.read ? 'font-black text-slate-950' : 'font-bold text-slate-700'}`}>
                        {n.title}
                    </h4>
                    {!n.read && (
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                    )}
                </div>
                <p className={`text-[11px] leading-relaxed ${!n.read ? 'text-slate-600 font-medium' : 'text-slate-400 font-medium'}`}>
                    {n.message}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9.5px] text-slate-350 font-bold uppercase tracking-wider">
                        {n.timestamp}
                    </span>
                    {n.meta && (
                        <>
                            <span className="text-slate-200">·</span>
                            <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${cfg.badge}`}>
                                {n.meta}
                            </span>
                        </>
                    )}
                    {isOrder && (
                        <>
                            <span className="text-slate-200">·</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-0.5">
                                View order <ChevronRight className="w-2.5 h-2.5" />
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Delete button */}
            <button
                onClick={onDelete}
                className="w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-all cursor-pointer border-none shrink-0 mt-0.5"
                title="Dismiss"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, ShoppingCart, AlertTriangle, ShieldAlert, UserPlus, Info } from 'lucide-react';
import OrderDetailsModal from '../modal/OrderDetailsModal';
import mockDb from '../mockDb';

// Seed initial notifications mock database state
const INITIAL_NOTIFICATIONS = [
    {
        id: 'notif-1',
        type: 'order',
        title: 'New Order Placed',
        message: 'Order #ORD-84920 has been registered. Value: ₦184,500.00',
        timestamp: '10 mins ago',
        read: false,
        referenceId: 'ORD-84920'
    },
    {
        id: 'notif-2',
        type: 'stock',
        title: 'Low Stock Alert',
        message: 'Product "Indigo Classic Jacket" is running low (3 remaining).',
        timestamp: '2 hours ago',
        read: false,
        referenceId: 'prod-103'
    },
    {
        id: 'notif-3',
        type: 'security',
        title: 'Payout Details Modified',
        message: 'Merchant payout bank settings were updated successfully.',
        timestamp: '5 hours ago',
        read: true
    },
    {
        id: 'notif-4',
        type: 'customer',
        title: 'New Customer Registered',
        message: 'A new user profile has signed up: salung@admin.com',
        timestamp: '1 day ago',
        read: true
    },
    {
        id: 'notif-5',
        type: 'order',
        title: 'Order Delivered',
        message: 'Order #ORD-72901 has been confirmed delivered by shipper.',
        timestamp: '2 days ago',
        read: true,
        referenceId: 'ORD-72901'
    }
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

    const handleMarkAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...prev.find(x => x.id === id), read: true } : n)
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleNotificationClick = (n) => {
        handleMarkAsRead(n.id);
        
        // If it's an order notification, allow quick previewing via bottom sheet
        if (n.type === 'order' && n.referenceId) {
            const dbOrders = mockDb.getOrders();
            const matchingOrder = dbOrders.find(o => o.id === n.referenceId);
            if (matchingOrder) {
                setSelectedOrder(matchingOrder);
                setIsOrderModalOpen(true);
            }
        }
    };

    const filteredNotifs = notifications.filter(n => {
        if (filter === 'all') return true;
        return n.type === filter;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'order':
                return (
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <ShoppingCart className="w-4.5 h-4.5" />
                    </div>
                );
            case 'stock':
                return (
                    <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                        <AlertTriangle className="w-4.5 h-4.5" />
                    </div>
                );
            case 'security':
                return (
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <ShieldAlert className="w-4.5 h-4.5" />
                    </div>
                );
            case 'customer':
                return (
                    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <UserPlus className="w-4.5 h-4.5" />
                    </div>
                );
            default:
                return (
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-550 shrink-0">
                        <Info className="w-4.5 h-4.5" />
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-12 select-none">
            
            {/* Action Bar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0">
                        <Bell className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="flex flex-col text-left">
                        <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                            Notification Center
                        </h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                            {unreadCount === 0 ? 'No unread logs' : `${unreadCount} unread updates require action`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="h-9 px-4 rounded-xl border border-slate-200 hover:border-slate-800 text-slate-800 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 bg-white"
                        >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark all read</span>
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="h-9 px-4 rounded-xl bg-rose-50 border border-rose-100 hover:bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Clear all</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Pill Selectors */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                {['all', 'order', 'stock', 'security', 'customer'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer shrink-0 ${
                            filter === type
                                ? 'bg-slate-900 border-slate-900 text-white'
                                : 'bg-white border-slate-150 text-slate-500 hover:border-slate-300'
                        }`}
                    >
                        {type === 'all' ? 'All Logs' : `${type}s`}
                    </button>
                ))}
            </div>

            {/* Notification List Container */}
            {filteredNotifs.length > 0 ? (
                <div className="flex flex-col border-t border-slate-150/60 mt-1">
                    {filteredNotifs.map((n) => (
                        <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`flex items-start justify-between py-4.5 border-b border-slate-100/60 hover:bg-slate-50/10 px-2 transition-all cursor-pointer select-none group rounded-xl mt-1 ${
                                !n.read ? 'bg-white border-l-2 border-l-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.01)]' : ''
                            }`}
                        >
                            <div className="flex items-start gap-4 flex-grow mr-4 text-left">
                                {getIcon(n.type)}
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-xs sm:text-sm text-slate-850 group-hover:text-black transition-colors ${!n.read ? 'font-black text-slate-950' : 'font-bold'}`}>
                                            {n.title}
                                        </h4>
                                        {!n.read && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                        )}
                                    </div>
                                    <p className={`text-xs leading-relaxed max-w-xl ${!n.read ? 'text-slate-800 font-semibold' : 'text-slate-500 font-medium'}`}>
                                        {n.message}
                                    </p>
                                    <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                                        {n.timestamp} {n.type === 'order' && n.referenceId && '· Click to preview order'}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={(e) => handleDelete(n.id, e)}
                                className="w-8 h-8 rounded-lg bg-transparent hover:bg-rose-50 hover:text-rose-600 text-slate-400 flex items-center justify-center transition-all cursor-pointer border-none shrink-0"
                                title="Dismiss notification"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">No notifications matched this filter.</p>
                </div>
            )}

            {/* Quick preview Order details bottom sheet */}
            <OrderDetailsModal
                isOpen={isOrderModalOpen}
                onClose={() => {
                    setIsOrderModalOpen(false);
                    setSelectedOrder(null);
                }}
                order={selectedOrder}
            />

        </div>
    );
}

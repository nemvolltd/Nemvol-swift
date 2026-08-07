import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Package,
    Tag,
    Heart,
    RotateCcw,
    ShoppingBag,
    Bell,
    CheckCheck,
    Truck,
    Gift,
    Star,
    Percent
} from 'lucide-react';

// ── Mock notification data ──────────────────────────────────────────────────
const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'order',
        icon: Truck,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-500',
        title: 'Your order is on its way!',
        body: 'Order #NMV-00342 has been shipped and is expected to arrive by Aug 9.',
        time: '2 min ago',
        read: false,
        group: 'Today',
    },
    {
        id: 2,
        type: 'promo',
        icon: Percent,
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-500',
        title: 'Flash Sale — 40% off selected items',
        body: 'Hurry! The flash sale ends tonight at midnight. Shop your favourites now.',
        time: '1 hr ago',
        read: false,
        group: 'Today',
    },
    {
        id: 3,
        type: 'wishlist',
        icon: Tag,
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-500',
        title: 'Price drop on your wishlist item',
        body: 'Wireless Earbuds Pro in your wishlist dropped from ₦35,000 to ₦24,500.',
        time: '3 hr ago',
        read: false,
        group: 'Today',
    },
    {
        id: 4,
        type: 'order',
        icon: Package,
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-500',
        title: 'Order delivered successfully',
        body: 'Order #NMV-00289 was delivered. Tap to leave a review.',
        time: 'Yesterday, 4:12 PM',
        read: true,
        group: 'Yesterday',
    },
    {
        id: 5,
        type: 'reward',
        icon: Gift,
        iconBg: 'bg-purple-50',
        iconColor: 'text-purple-500',
        title: 'You earned 250 loyalty points!',
        body: 'Thanks for your recent purchase. Points have been added to your account.',
        time: 'Yesterday, 11:30 AM',
        read: true,
        group: 'Yesterday',
    },
    {
        id: 6,
        type: 'review',
        icon: Star,
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-500',
        title: 'Rate your recent purchase',
        body: 'How was the Slim Fit Oxford Shirt? Share your experience to help others.',
        time: '2 days ago',
        read: true,
        group: 'Earlier',
    },
    {
        id: 7,
        type: 'promo',
        icon: ShoppingBag,
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-500',
        title: 'New arrivals just landed 🔥',
        body: 'Fresh collections from top brands are now live. Be first to shop!',
        time: '3 days ago',
        read: true,
        group: 'Earlier',
    },
    {
        id: 8,
        type: 'order',
        icon: RotateCcw,
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-500',
        title: 'Return request approved',
        body: 'Your return for Order #NMV-00201 has been accepted. Refund processing in 3–5 days.',
        time: '5 days ago',
        read: true,
        group: 'Earlier',
    },
    {
        id: 9,
        type: 'wishlist',
        icon: Heart,
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-500',
        title: 'Item back in stock!',
        body: 'Classic White Sneakers you saved is back in stock. Limited quantities remain.',
        time: '1 week ago',
        read: true,
        group: 'Earlier',
    },
];

const FILTER_TABS = ['All', 'Orders', 'Promos', 'Wishlist'];

export default function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [activeFilter, setActiveFilter] = useState('All');

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const markRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const filterMap = {
        'All': null,
        'Orders': 'order',
        'Promos': 'promo',
        'Wishlist': 'wishlist',
    };

    const filtered = activeFilter === 'All'
        ? notifications
        : notifications.filter(n => n.type === filterMap[activeFilter]);

    // Group by date label
    const groups = filtered.reduce((acc, n) => {
        if (!acc[n.group]) acc[n.group] = [];
        acc[n.group].push(n);
        return acc;
    }, {});

    const groupOrder = ['Today', 'Yesterday', 'Earlier'];

    return (
        <div className="w-full max-w-md mx-auto px-5 py-6 animate-pageSlideUp min-h-screen pb-16 bg-slate-50/50">

            {/* Topbar */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
                    aria-label="Back"
                >
                    <ArrowLeft className="w-4 h-4 text-slate-800" strokeWidth={2.2} />
                </button>

                <div className="flex items-center gap-2">
                    <h1 className="text-base font-bold text-slate-900">Notifications</h1>
                    {unreadCount > 0 && (
                        <span className="min-w-5 h-5 px-1.5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </div>

                {unreadCount > 0 ? (
                    <button
                        onClick={markAllRead}
                        className="flex items-center gap-1 text-[10px] font-bold text-orange-500 hover:text-orange-600 transition-colors cursor-pointer border-none bg-transparent"
                        aria-label="Mark all as read"
                    >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>All read</span>
                    </button>
                ) : (
                    <div className="w-16" />
                )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto hide-scrollbar">
                {FILTER_TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveFilter(tab)}
                        className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wide whitespace-nowrap border-none cursor-pointer transition-all ${
                            activeFilter === tab
                                ? 'bg-orange-500 text-white shadow-[0_4px_12px_rgba(249,115,22,0.30)]'
                                : 'bg-white border border-slate-100 text-slate-500 hover:border-orange-200 hover:text-orange-500'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Notification Groups */}
            {filtered.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Bell className="w-7 h-7 text-slate-350" />
                    </div>
                    <h3 className="text-sm font-black text-slate-800 mb-1">No notifications yet</h3>
                    <p className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed">
                        We'll notify you when something new arrives in this category.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {groupOrder.map(group => {
                        const items = groups[group];
                        if (!items || items.length === 0) return null;
                        return (
                            <div key={group}>
                                {/* Group Header */}
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3 pl-1">
                                    {group}
                                </h3>

                                {/* Notification Cards */}
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
                                    {items.map((notif, idx) => {
                                        const Icon = notif.icon;
                                        return (
                                            <div
                                                key={notif.id}
                                                onClick={() => markRead(notif.id)}
                                                className={`relative flex items-start gap-3.5 p-4 cursor-pointer transition-colors hover:bg-slate-50/70 ${
                                                    idx !== items.length - 1 ? 'border-b border-slate-50' : ''
                                                } ${!notif.read ? 'bg-orange-50/30' : ''}`}
                                            >
                                                {/* Icon */}
                                                <div className={`w-10 h-10 rounded-2xl ${notif.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                                                    <Icon className={`w-4 h-4 ${notif.iconColor}`} strokeWidth={2} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-1">
                                                        <span className={`text-[11px] font-black leading-snug text-slate-900 ${!notif.read ? 'text-slate-950' : ''}`}>
                                                            {notif.title}
                                                        </span>
                                                        {!notif.read && (
                                                            <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1" />
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] text-slate-450 leading-relaxed mb-1.5 line-clamp-2">
                                                        {notif.body}
                                                    </p>
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">
                                                        {notif.time}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

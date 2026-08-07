import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    Settings, 
    Phone, 
    Mail, 
    MapPin, 
    Package, 
    Heart, 
    RotateCcw, 
    CreditCard, 
    LogOut, 
    ChevronRight,
    Edit2
} from 'lucide-react';
import useStore from '../../store/useStore';
import { useLogout } from '../../hooks/useAuth';

export default function Profile() {
    const navigate = useNavigate();
    const user = useStore((s) => s.user);
    const { mutate: logoutUser } = useLogout();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    // Stable mock values for demo
    const phoneVal = user?.phone || '+7 904 599 38 11';
    const addressVal = user?.address || 'St. Petersburg, Vosstaniya St...';

    return (
        <div className="w-full max-w-md mx-auto px-5 py-6 animate-pageSlideUp min-h-screen pb-16 bg-slate-50/50">
            
            {/* Top Navigation Bar matching mockup */}
            <div className="flex items-center justify-between mb-8">
                <button 
                    onClick={() => navigate('/')}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
                    aria-label="Back"
                >
                    <ArrowLeft className="w-4 h-4 text-slate-800" strokeWidth={2.2} />
                </button>

                <h1 className="text-base font-bold text-slate-900">Profile</h1>

                <button 
                    onClick={() => navigate('/settings')}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
                    aria-label="Settings"
                >
                    <Settings className="w-4 h-4 text-slate-800" strokeWidth={1.8} />
                </button>
            </div>

            {/* User Avatar Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative w-24 h-24 mb-3">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-gradient-to-tr from-orange-400 to-amber-300 flex items-center justify-center text-white text-3xl font-bold uppercase">
                        {user?.name ? user.name.slice(0, 2) : 'AG'}
                    </div>
                    {/* Pencil edit icon floating bottom-right */}
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md border border-slate-150 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer">
                        <Edit2 className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
                    </button>
                </div>

                {/* User Name */}
                <h2 className="text-lg font-black text-slate-900">
                    {user?.name || 'Alex Gilles'}
                </h2>
            </div>

            {/* Core Info Card (Phone, Email, Address) */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden mb-8">
                {/* Phone row */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                            <Phone className="w-4 h-4" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider leading-none mb-1">Phone</span>
                            <span className="text-xs font-bold text-slate-800">{phoneVal}</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>

                {/* Email row */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                            <Mail className="w-4 h-4" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider leading-none mb-1">Email</span>
                            <span className="text-xs font-bold text-slate-800">{user?.email || 'alexg@gmail.com'}</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>

                {/* Address row */}
                <div 
                    onClick={() => navigate('/addresses')}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                            <MapPin className="w-4 h-4" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider leading-none mb-1">Address</span>
                            <span className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{addressVal}</span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
            </div>

            {/* My Orders Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-slate-900">My Orders</h3>
                    <button 
                        onClick={() => navigate('/orders')}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 border-none bg-transparent cursor-pointer"
                    >
                        View all <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* 3 columns horizontal cards */}
                <div className="grid grid-cols-3 gap-3">
                    {/* Active Orders */}
                    <div 
                        onClick={() => navigate('/orders')}
                        className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow group"
                    >
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-2.5">
                            <Package className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 leading-tight mb-1">Active</span>
                        <span className="text-[9px] text-slate-400">2 Items</span>
                    </div>

                    {/* Wishlist */}
                    <div 
                        onClick={() => navigate('/wishlist')}
                        className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow group"
                    >
                        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-2.5">
                            <Heart className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 leading-tight mb-1">Wishlist</span>
                        <span className="text-[9px] text-slate-400">Saved Items</span>
                    </div>

                    {/* Returns */}
                    <div 
                        onClick={() => navigate('/orders')}
                        className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow group"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mb-2.5">
                            <RotateCcw className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 leading-tight mb-1">Returns</span>
                        <span className="text-[9px] text-slate-400">0 Items</span>
                    </div>
                </div>
            </div>

            {/* Shopping Settings Section */}
            <div className="mb-8">
                <h3 className="text-sm font-black text-slate-900 mb-4">Account Settings</h3>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
                    {/* Saved Cards */}
                    <div 
                        onClick={() => navigate('/payment-methods')}
                        className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                                <CreditCard className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-800">Payment Methods</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>

                    {/* Shipping Addresses */}
                    <div 
                        onClick={() => navigate('/addresses')}
                        className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-800">Shipping Addresses</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>

                    {/* Log Out */}
                    <div 
                        onClick={handleLogout}
                        className="flex items-center justify-between p-4 hover:bg-rose-50/30 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-rose-50/50 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors">
                                <LogOut className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors">Log Out Account</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-450 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}

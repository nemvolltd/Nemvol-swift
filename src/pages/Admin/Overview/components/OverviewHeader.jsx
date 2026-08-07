import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, Package, FolderTree, ShoppingCart, Users, CreditCard } from 'lucide-react';
import ActionBtn from './ActionBtn';

export default function OverviewHeader({
    totalRevenue,
    totalProductValue,
    activeOrdersCount,
    productsCount,
    categoriesCount,
    ordersCount,
    usersCount,
    onLogout,
    accountNumber,
    onAccountClick,
}) {
    const navigate = useNavigate();

    const fmt = (n) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

    const renderAccountBadge = () => (
        <button
            type="button"
            onClick={onAccountClick}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:scale-95 transition-all rounded-full px-2.5 py-1 text-[9.5px] font-bold cursor-pointer border-none text-white select-none shrink-0"
            title="Configure Payout Destination"
        >
            <CreditCard className="w-3 h-3 text-white fill-white" />
            <span>{accountNumber || '0123456789'}</span>
        </button>
    );

    return (
        <div className="flex flex-col gap-6">
            {/* ── Scrollable Card Carousel (Swipeable Horizontal Row) ─────── */}
            <div className="w-full flex flex-nowrap gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x snap-mandatory">
                
                {/* 1. Blue Card (Product In Stock Value) */}
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[325px] bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white flex flex-col justify-between h-[175px] select-none">
                    <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                    <div className="flex items-center justify-between z-10">
                        <span className="text-[9.5px] font-bold tracking-widest text-white/50 uppercase">Inventory Value</span>
                        {renderAccountBadge()}
                    </div>
                    <div className="z-10">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Product In Stock Value</span>
                        <span className="text-3xl font-extrabold tracking-tight mt-1 block">₦{fmt(totalProductValue)}</span>
                    </div>
                </div>

                {/* 2. Green Card (Total Sales / Revenue) */}
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[325px] bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white flex flex-col justify-between h-[175px] select-none">
                    <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                    <div className="flex items-center justify-between z-10">
                        <span className="text-[9.5px] font-bold tracking-widest text-white/50 uppercase">Store Revenue</span>
                        {renderAccountBadge()}
                    </div>
                    <div className="z-10">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Total Revenue</span>
                        <span className="text-3xl font-extrabold tracking-tight mt-1 block">₦{fmt(totalRevenue)}</span>
                    </div>
                </div>

                {/* 3. Black/Dark Card (Total Orders Logged) */}
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[325px] bg-[#18191b] rounded-3xl p-6 shadow-xl relative overflow-hidden text-white flex flex-col justify-between h-[175px] select-none">
                    <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                    <div className="flex items-center justify-between z-10">
                        <span className="text-[9.5px] font-bold tracking-widest text-white/45 uppercase">Orders catalog</span>
                        {renderAccountBadge()}
                    </div>
                    <div className="z-10">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Total Orders</span>
                        <span className="text-3xl font-extrabold tracking-tight mt-1 block">{ordersCount} Orders</span>
                    </div>
                </div>

                {/* 4. Indigo Card (Active/Pending Fulfillment Orders) */}
                <div className="snap-start flex-shrink-0 w-[290px] sm:w-[325px] bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white flex flex-col justify-between h-[175px] select-none">
                    <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                    <div className="flex items-center justify-between z-10">
                        <span className="text-[9.5px] font-bold tracking-widest text-white/50 uppercase">Pending Tasks</span>
                        {renderAccountBadge()}
                    </div>
                    <div className="z-10">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Active Orders</span>
                        <span className="text-3xl font-extrabold tracking-tight mt-1 block">{activeOrdersCount} Pending</span>
                    </div>
                </div>
            </div>

            {/* ── Quick Action Row (Circular buttons like Send/Receive in the image) ── */}
            <div className="flex items-center justify-around gap-2 py-5 bg-white border border-slate-100/90 rounded-3xl shadow-[0_2px_8px_rgba(15,23,42,0.01)] px-4">
                <ActionBtn
                    label="Products"
                    icon={Package}
                    count={productsCount}
                    onClick={() => navigate('/admin/products')}
                />
                <ActionBtn
                    label="Categories"
                    icon={FolderTree}
                    count={categoriesCount}
                    onClick={() => navigate('/admin/categories')}
                />
                <ActionBtn
                    label="Orders"
                    icon={ShoppingCart}
                    count={ordersCount}
                    onClick={() => navigate('/admin/orders')}
                />
                <ActionBtn
                    label="Customers"
                    icon={Users}
                    count={usersCount}
                    onClick={() => navigate('/admin/users')}
                />
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft, LogOut } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import OverviewTab from './OverviewTab';
import ProductsTab from './ProductsTab';
import OrdersTab from './OrdersTab';
import UsersTab from './UsersTab';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    const {
        products,
        orders,
        users,
        createProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        isLoadingProducts,
        isLoadingOrders,
        logoutAdmin
    } = useEcommerce();

    const handleBackToStore = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col md:flex-row text-slate-800">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 p-6 sticky top-0 h-screen z-30">
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-600/10">
                        A
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 leading-none">Admin Studio</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Management</span>
                    </div>
                </div>

                {/* Nav list */}
                <nav className="flex flex-col gap-1.5 flex-1">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === 'overview'
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Overview
                    </button>

                    <button
                        onClick={() => setActiveTab('products')}
                        className={`h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === 'products'
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <Package className="w-4 h-4" />
                        Products
                    </button>

                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === 'orders'
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Orders
                    </button>

                    <button
                        onClick={() => setActiveTab('users')}
                        className={`h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === 'users'
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <Users className="w-4 h-4" />
                        Customers
                    </button>
                </nav>

                {/* Bottom Navigation shortcuts */}
                <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                    <button
                        onClick={handleBackToStore}
                        className="h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Main Storefront
                    </button>
                    <button
                        onClick={() => {
                            logoutAdmin();
                            navigate('/admin/login');
                        }}
                        className="h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-bold text-red-600 hover:bg-red-50/50 hover:text-red-700 uppercase tracking-wider transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Top Header (No Tabs) */}
            <div className="md:hidden flex bg-white border-b border-slate-100 sticky top-0 z-30">
                <div className="flex items-center justify-between w-full px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
                            A
                        </div>
                        <span className="text-sm font-black text-slate-900">Admin Panel</span>
                    </div>
                    <button
                        onClick={() => {
                            logoutAdmin();
                            navigate('/admin/login');
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        title="Sign Out"
                    >
                        <LogOut className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>

            {/* Dashboard Content Panel */}
            <main className="flex-1 p-4 pb-24 md:p-8 max-w-6xl mx-auto w-full">
                {activeTab === 'overview' && (
                    <OverviewTab
                        products={products}
                        orders={orders}
                        onSwitchTab={setActiveTab}
                    />
                )}

                {activeTab === 'products' && (
                    <ProductsTab
                        products={products}
                        onCreateProduct={createProduct}
                        onUpdateProduct={updateProduct}
                        onDeleteProduct={deleteProduct}
                        isLoading={isLoadingProducts}
                    />
                )}

                {activeTab === 'orders' && (
                    <OrdersTab
                        orders={orders}
                        onUpdateOrderStatus={updateOrderStatus}
                        isLoading={isLoadingOrders}
                    />
                )}

                {activeTab === 'users' && (
                    <UsersTab
                        users={users}
                        orders={orders}
                    />
                )}
            </main>

            {/* Mobile Fixed Bottom Navigation Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 pb-safe pt-2.5 px-6 z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between h-14 max-w-md mx-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${
                            activeTab === 'overview' ? 'text-blue-600 scale-105' : 'text-slate-400'
                        }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-[9px] font-black uppercase tracking-wider">Overview</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${
                            activeTab === 'products' ? 'text-blue-600 scale-105' : 'text-slate-400'
                        }`}
                    >
                        <Package className="w-5 h-5" />
                        <span className="text-[9px] font-black uppercase tracking-wider">Products</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${
                            activeTab === 'orders' ? 'text-blue-600 scale-105' : 'text-slate-400'
                        }`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="text-[9px] font-black uppercase tracking-wider">Orders</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${
                            activeTab === 'users' ? 'text-blue-600 scale-105' : 'text-slate-400'
                        }`}
                    >
                        <Users className="w-5 h-5" />
                        <span className="text-[9px] font-black uppercase tracking-wider">Users</span>
                    </button>

                    <button
                        onClick={handleBackToStore}
                        className="flex flex-col items-center justify-center gap-1 flex-1 text-slate-400"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-[9px] font-black uppercase tracking-wider">Exit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

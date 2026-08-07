import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockDb from '../mockDb';
import OverviewHeader from './components/OverviewHeader';
import RevenueChart from './components/RevenueChart';
import RecentTransactions from './components/RecentTransactions';
import AccountUpdateModal from '../modal/AccountUpdateModal';
import { useAdminLogout } from '../../../hooks/useAuth';

export default function Overview() {
    const navigate = useNavigate();
    const { logout } = useAdminLogout();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [settings, setSettings] = useState(null);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProducts(mockDb.getProducts());
            setCategories(mockDb.getCategories());
            setOrders(mockDb.getOrders());
            setUsers(mockDb.getUsers());
            setSettings(mockDb.getSettings());
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Calculate metrics for OverviewHeader
    const totalRevenue = orders.reduce((sum, o) => {
        const v = typeof o.total === 'number' ? o.total : parseFloat(String(o.total).replace(/[^0-9.]/g, '')) || 0;
        return sum + v;
    }, 0);

    const totalProductValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
    const activeOrdersCount = orders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleAccountSave = (newAccountNum) => {
        if (settings) {
            const updated = { ...settings, accountNumber: newAccountNum };
            mockDb.saveSettings(updated);
            setSettings(updated);
        }
        setIsAccountModalOpen(false);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[55vh] gap-3">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gathering metrics...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-12">
            {/* Modular Header */}
            <OverviewHeader
                totalRevenue={totalRevenue}
                totalProductValue={totalProductValue}
                activeOrdersCount={activeOrdersCount}
                productsCount={products.length}
                categoriesCount={categories.length}
                ordersCount={orders.length}
                usersCount={users.length}
                onLogout={handleLogout}
                accountNumber={settings?.accountNumber}
                onAccountClick={() => setIsAccountModalOpen(true)}
            />

            {/* Charts & Analytics Stack */}
            <div className="flex flex-col gap-6 w-full">
                <RevenueChart orders={orders} />
                <RecentTransactions orders={orders} />
            </div>

            {/* Edit Account Number Modal */}
            <AccountUpdateModal
                isOpen={isAccountModalOpen}
                onClose={() => setIsAccountModalOpen(false)}
                currentValue={settings?.accountNumber}
                onSave={handleAccountSave}
            />
        </div>
    );
}

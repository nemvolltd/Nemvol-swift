import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Plus,
    FolderTree,
} from 'lucide-react';
import ProductModal from '../modal/ProductModal';
import { useCreateProduct } from '../../../hooks/useProducts';

const LEFT_ITEMS = [
    { path: '/admin/overview',    label: 'Overview',    icon: LayoutDashboard },
    { path: '/admin/products',    label: 'Products',    icon: Package },
];
const RIGHT_ITEMS = [
    { path: '/admin/orders',      label: 'Orders',      icon: ShoppingCart },
    { path: '/admin/users',       label: 'Customers',   icon: Users },
];

export default function AdminMobileNav({ isVisible = true }) {
    const navigate  = useNavigate();
    const location  = useLocation();
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const { mutate: createProduct } = useCreateProduct();

    const isActive = (path) => location.pathname === path;

    const handleProductSubmit = (formData) => {
        createProduct(formData);
        setIsProductModalOpen(false);
    };

    const NavBtn = ({ path, label, icon: Icon }) => {
        const active = isActive(path);
        return (
            <button
                key={path}
                onClick={() => navigate(path)}
                title={label}
                aria-label={label}
                className={`
                    relative w-12 h-12 flex items-center justify-center rounded-full
                    transition-all duration-300 select-none border-none cursor-pointer
                    ${active
                        ? 'bg-slate-900 text-white shadow-[0_4px_12px_rgba(15,23,42,0.25)] scale-105'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 active:scale-95'
                    }
                `}
            >
                <Icon
                    className="w-5 h-5 transition-transform duration-200"
                    strokeWidth={active ? 2.2 : 1.8}
                />
            </button>
        );
    };

    return (
        <>
            <div className={`md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
            }`}>
                <div
                    className="flex items-center gap-2 px-4 py-3 rounded-full
                               bg-white/80 backdrop-blur-2xl
                               shadow-[0_8px_36px_rgba(0,0,0,0.13),0_1px_2px_rgba(0,0,0,0.06)]
                               border border-white/60"
                >
                    {/* Left nav items */}
                    {LEFT_ITEMS.map(item => <NavBtn key={item.path} {...item} />)}

                    {/* Center Plus button */}
                    <button
                        onClick={() => setIsProductModalOpen(true)}
                        title="Add Product"
                        aria-label="Add Product"
                        className="
                            relative flex items-center justify-center rounded-full
                            bg-gradient-to-br from-orange-500 to-orange-600
                            shadow-[0_8px_24px_rgba(249,115,22,0.45)]
                            hover:shadow-[0_10px_28px_rgba(249,115,22,0.55)]
                            hover:scale-110 active:scale-95
                            transition-all duration-300 select-none border-none cursor-pointer
                            -translate-y-3
                        "
                        style={{ width: '58px', height: '58px', marginInline: '6px' }}
                    >
                        <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </button>

                    {/* Right nav items */}
                    {RIGHT_ITEMS.map(item => <NavBtn key={item.path} {...item} />)}
                </div>
            </div>

            <ProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                onSubmit={handleProductSubmit}
                product={null}
            />
        </>
    );
}

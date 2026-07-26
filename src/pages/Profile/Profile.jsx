import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import UserInfoCard from './UserInfoCard';
import ProfileOptionsList from './ProfileOptionsList';

export default function Profile() {
    const navigate = useNavigate();
    const { contactInfo, isLoggedIn, logoutUser } = useEcommerce();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    const profileOptions = [
        { id: 'orders', icon: Package, label: 'My Orders', link: '/orders' },
        { id: 'addresses', icon: MapPin, label: 'Shipping Addresses', link: '/addresses' },
        { id: 'payment', icon: CreditCard, label: 'Payment Methods', link: '/payment-methods' },
        { id: 'settings', icon: Settings, label: 'Settings', link: '/settings' },
    ];

    if (!isLoggedIn) return null;

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-6 md:py-10">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">My Profile</h1>

            {/* User Info Card */}
            <UserInfoCard name={contactInfo.name} email={contactInfo.email} />

            {/* Options List */}
            <ProfileOptionsList options={profileOptions} />

            {/* Log Out Button */}
            <button 
                onClick={() => {
                    logoutUser();
                    navigate('/login');
                }}
                className="w-full h-14 bg-white border border-red-100 text-red-500 hover:bg-red-50 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
                <LogOut className="w-4 h-4" />
                Log Out
            </button>
        </div>
    );
}

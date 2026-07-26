import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import OrderSuccessCard from './OrderSuccessCard';

export default function PurchaseSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Resolve order from navigation state, fallback to a mock if accessed directly
    const order = location.state?.order || {
        id: 'ORD-MOCK-9999',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        shippingAddress: '57th Spring Avenue, Ikeja, Lagos.',
        paymentMethod: 'Debit Card (**** 7682)',
        total: '$256.00'
    };

    return (
        <div className="w-full max-w-md mx-auto px-4 py-12 text-center flex flex-col justify-center min-h-[80vh]">
            {/* Celebration Icon */}
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-600/20">
                <Check className="w-10 h-10" strokeWidth={3} />
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Purchase Success!</h1>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Thank you for your order. We will send you an email confirmation with tracking details shortly.
            </p>

            {/* Order Card */}
            <OrderSuccessCard order={order} />

            {/* Actions */}
            <div className="flex flex-col gap-3">
                <button
                    onClick={() => navigate('/orders')}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/10"
                >
                    Track Order
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="w-full h-14 bg-white border border-blue-200 hover:bg-blue-50/30 text-blue-600 text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-sm"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

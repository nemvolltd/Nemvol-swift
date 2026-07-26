import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import OrderCard from './OrderCard';
import OrderDetailsModal from './OrderDetailsModal';

const OrdersSkeleton = () => (
    <div className="flex flex-col gap-6 animate-pulse">
        {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-5 bg-slate-200 rounded w-16"></div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-slate-200 rounded-xl"></div>
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                        <div className="h-3.5 bg-slate-200 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default function Orders() {
    const navigate = useNavigate();
    const { orders, isLoadingOrders, errors } = useEcommerce();
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-6 md:py-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors border border-slate-100"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-900" />
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Order History</h1>
            </div>

            {/* List */}
            {isLoadingOrders ? (
                <OrdersSkeleton />
            ) : errors.orders ? (
                <div className="text-center py-10 bg-red-50/50 rounded-2xl border border-red-100/50">
                    <p className="text-red-600 text-sm font-bold">{errors.orders}</p>
                </div>
            ) : orders.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onViewDetails={() => setSelectedOrder(order)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-slate-400 text-sm">
                    You have not placed any orders yet.
                </div>
            )}

            {/* Details Modal */}
            <OrderDetailsModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </div>
    );
}

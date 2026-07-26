import React from 'react';
import { Check } from 'lucide-react';

export default function OrderSuccessCard({ order }) {
    if (!order) return null;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col gap-6 text-left">
            {/* Header Success Checkmark */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium">Order Number</span>
                    <span className="text-base font-bold text-slate-900">{order.id}</span>
                </div>
            </div>

            <div className="h-px w-full bg-slate-100"></div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400 font-medium">Order Date</span>
                    <span className="text-sm font-bold text-slate-900">{order.date}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400 font-medium">Payment Method</span>
                    <span className="text-sm font-bold text-slate-900 truncate">{order.paymentMethod}</span>
                </div>
            </div>

            <div className="h-px w-full bg-slate-100"></div>

            <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400 font-medium">Deliver to</span>
                <span className="text-sm font-bold text-slate-900">{order.shippingAddress}</span>
            </div>
        </div>
    );
}

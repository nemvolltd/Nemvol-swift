import React from 'react';

export default function OrderCard({ order, onViewDetails }) {
    const isProcessing = order.status.toLowerCase() === 'processing';

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
            {/* Header info */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order ID</span>
                    <span className="text-sm font-bold text-slate-900">{order.id}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
                    <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-blue-600 animate-pulse' : 'bg-green-500'}`} />
                    <span className="text-xs font-bold text-slate-700">{order.status}</span>
                </div>
            </div>

            <div className="h-px w-full bg-slate-100" />

            {/* Items Summary list */}
            <div className="flex flex-col gap-3">
                {order.items.map((item, idx) => (
                    <div key={`${item.product?.id || idx}-${item.size}-${idx}`} className="flex gap-3 items-center">
                        <div className="w-12 h-16 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                            <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{item.product?.name}</h4>
                            <p className="text-[10px] text-slate-400 font-medium">Qty: {item.quantity} | Size: {item.size}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-px w-full bg-slate-100" />

            {/* Footer and view details */}
            <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-medium">Total Amount</span>
                    <span className="text-sm font-bold text-slate-900">{order.total}</span>
                </div>
                <button
                    onClick={onViewDetails}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}

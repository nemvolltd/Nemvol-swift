import React from 'react';

export default function OrderItemsList({ items }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Order Items</h2>
            <div className="flex flex-col gap-4">
                {items.map((item, idx) => (
                    <div key={`${item.product.id}-${item.size}-${idx}`} className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-sm font-bold text-slate-900">{item.product.name}</h3>
                            <p className="text-xs text-slate-500">Qty: {item.quantity} | Size: {item.size}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

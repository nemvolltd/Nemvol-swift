import React from 'react';

export default function OrderItemsList({ items }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="px-5 pt-5 pb-3 border-b border-slate-50">
                <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Order Items
                    <span className="ml-2 text-[10px] font-bold text-slate-400 normal-case tracking-normal">({items.length} item{items.length !== 1 ? 's' : ''})</span>
                </h2>
            </div>

            <div className="flex flex-col divide-y divide-slate-50">
                {items.map((item, idx) => {
                    const itemTotal = item.product.price * item.quantity;
                    return (
                        <div key={`${item.product.id}-${item.size}-${idx}`} className="flex gap-4 items-center px-5 py-4">
                            {/* Product image */}
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xs font-black text-slate-900 truncate mb-1">{item.product.name}</h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {item.size && (
                                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                            Size: {item.size}
                                        </span>
                                    )}
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                        Qty: {item.quantity}
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <span className="text-sm font-black text-slate-900 shrink-0">
                                ₦{itemTotal.toLocaleString()}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

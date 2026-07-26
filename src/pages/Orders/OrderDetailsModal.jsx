import React from 'react';
import { X, Calendar, MapPin, CreditCard, Box } from 'lucide-react';

export default function OrderDetailsModal({ order, onClose }) {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            {/* Modal Box */}
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[75vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">Order Details</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{order.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
                        aria-label="Close details"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-4">
                    {/* Status Banner */}
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <Box className="w-4 h-4 text-blue-600" />
                        <div className="flex flex-col">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Status</span>
                            <span className="text-xs font-bold text-slate-900">{order.status}</span>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Items ({order.items.length})</h4>
                        <div className="flex flex-col gap-3">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-center">
                                    <div className="w-10 h-14 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h5 className="text-[11px] font-bold text-slate-900 truncate">{item.product?.name}</h5>
                                        <p className="text-[9px] text-slate-500 font-medium">Qty: {item.quantity} | Size: {item.size}</p>
                                    </div>
                                    <span className="text-xs font-black text-slate-900">
                                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px w-full bg-slate-100" />

                    {/* Delivery & Payment Details */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fulfillment</h4>
                        
                        <div className="flex items-start gap-2.5">
                            <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div className="flex flex-col">
                                <span className="text-[9px] text-slate-400 font-medium">Order Date</span>
                                <span className="text-xs font-bold text-slate-900">{order.date}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div className="flex flex-col">
                                <span className="text-[9px] text-slate-400 font-medium">Delivery Address</span>
                                <span className="text-xs font-bold text-slate-900 leading-snug">{order.shippingAddress}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                            <CreditCard className="w-4 h-4 text-slate-400 mt-0.5" />
                            <div className="flex flex-col">
                                <span className="text-[9px] text-slate-400 font-medium">Payment Details</span>
                                <span className="text-xs font-bold text-slate-900">{order.paymentMethod}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Total */}
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Paid Amount</span>
                        <span className="text-sm font-black text-blue-600">{order.total}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-9 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

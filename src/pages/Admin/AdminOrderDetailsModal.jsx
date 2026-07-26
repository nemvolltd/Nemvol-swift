import React from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, MapPin, CreditCard, Box } from 'lucide-react';

export default function AdminOrderDetailsModal({ isOpen, onClose, order }) {
    if (!isOpen || !order) return null;

    const statusColors = {
        Processing: 'bg-amber-50 text-amber-700 border-amber-100',
        Shipped: 'bg-blue-50 text-blue-700 border-blue-100',
        Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        Cancelled: 'bg-red-50 text-red-700 border-red-100',
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                            Order details
                        </h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{order.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-4">
                    {/* Date & Status */}
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100/50">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <div className="flex flex-col">
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Order Date</span>
                                <span className="text-xs font-bold text-slate-800">{order.date}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Status</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusColors[order.status] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>

                    {/* Shipping & Payment info */}
                    <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-500">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Shipping Address</span>
                            </div>
                            <p className="text-xs text-slate-700 font-semibold leading-relaxed">{order.shippingAddress}</p>
                        </div>

                        <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-500">
                                <CreditCard className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Payment Details</span>
                            </div>
                            <p className="text-xs text-slate-700 font-semibold leading-relaxed">{order.paymentMethod}</p>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                            <Box className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-bold uppercase tracking-wider">Line Items</span>
                        </div>
                        <div className="flex flex-col gap-2.5 divide-y divide-slate-50">
                            {order.items && order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between pt-2.5 first:pt-0">
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src={item.product?.image || 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'}
                                            alt={item.product?.name || 'Product'}
                                            className="w-9 h-11 object-cover rounded-lg bg-slate-50 border border-slate-100/50"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-800">{item.product?.name || 'Deleted Product'}</span>
                                            <span className="text-[9px] text-slate-400 font-bold">
                                                Size: {item.size} &nbsp;&bull;&nbsp; Qty: {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-extrabold text-slate-900">
                                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Charge</span>
                    <span className="text-base font-black text-blue-600">{order.total}</span>
                </div>
            </div>
        </div>,
        document.body
    );
}

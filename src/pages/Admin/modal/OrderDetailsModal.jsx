import React from 'react';
import { createPortal } from 'react-dom';
import { Calendar, MapPin, CreditCard, Box, ArrowLeft } from 'lucide-react';

export default function OrderDetailsModal({ isOpen, onClose, order }) {
    if (!isOpen || !order) return null;

    const fmt = (n) => new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

    const getStatusTextClass = (s) => {
        switch (s) {
            case 'Processing': return 'text-amber-600';
            case 'Shipped': return 'text-blue-600';
            case 'Delivered': return 'text-emerald-600';
            case 'Cancelled': return 'text-rose-600';
            default: return 'text-slate-600';
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn select-none">
            
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Bottom-sheet Order Details drawer */}
            <div className="relative bg-white rounded-t-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-slideUp z-10">
                
                {/* Grab indicator handle */}
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-2.5 shrink-0" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-700 transition-colors border-none"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                            Order Details
                        </h3>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                            {order.id}
                        </span>
                    </div>
                    <div className="w-9" />
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    
                    {/* Status & Date */}
                    <div className="flex items-center justify-between p-4 bg-slate-55/40 rounded-xl border border-slate-100/50">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4.5 h-4.5 text-slate-400" />
                            <div className="flex flex-col text-left">
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Order Date</span>
                                <span className="text-xs font-bold text-slate-800 mt-0.5">{order.date}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Status</span>
                            <span className={`text-[10px] font-black uppercase tracking-wider mt-0.5 ${getStatusTextClass(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>

                    {/* Shipping and Payment Info */}
                    <div className="flex flex-col gap-3">
                        <div className="p-4 bg-slate-50/20 border border-slate-100/80 rounded-xl flex flex-col gap-1.5 text-left">
                            <div className="flex items-center gap-1.5 text-slate-500">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Shipping Destination</span>
                            </div>
                            <p className="text-xs text-slate-700 font-bold leading-relaxed">
                                {typeof order.shippingAddress === 'object' 
                                    ? `${order.shippingAddress.name}, ${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`
                                    : order.shippingAddress || 'No address details'}
                            </p>
                        </div>

                        <div className="p-4 bg-slate-50/20 border border-slate-100/80 rounded-xl flex flex-col gap-1.5 text-left">
                            <div className="flex items-center gap-1.5 text-slate-500">
                                <CreditCard className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Payment Details</span>
                            </div>
                            <p className="text-xs text-slate-700 font-bold uppercase tracking-wide">
                                {order.paymentMethod || 'Credit Card'}
                            </p>
                        </div>
                    </div>

                    {/* Purchased Items */}
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                            <Box className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-bold uppercase tracking-wider">Line Items</span>
                        </div>
                        <div className="flex flex-col gap-3.5 divide-y divide-slate-100">
                            {order.items && order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between pt-3.5 first:pt-0">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.product?.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200'}
                                            alt={item.product?.name || 'Product'}
                                            className="w-10 h-12 object-cover rounded-md bg-slate-50 border border-slate-100/60"
                                        />
                                        <div className="flex flex-col text-left">
                                            <span className="text-xs font-bold text-slate-800">{item.product?.name || 'Item'}</span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">
                                                Size: {item.size || 'M'} · Qty: {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-slate-900">
                                        ₦{fmt((item.product?.price || item.price || 0) * item.quantity)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Sum */}
                <div className="px-6 py-4.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Charge</span>
                    <span className="text-sm font-black text-slate-950">
                        ₦{fmt(typeof order.total === 'number' ? order.total : parseFloat(order.total) || 0)}
                    </span>
                </div>

            </div>
        </div>,
        document.body
    );
}

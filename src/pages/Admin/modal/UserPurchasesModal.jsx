import React from 'react';
import { createPortal } from 'react-dom';
import { ShoppingBag, Calendar, CreditCard, MapPin, ArrowLeft } from 'lucide-react';

export default function UserPurchasesModal({ isOpen, onClose, user, userOrders }) {
    if (!isOpen || !user) return null;

    const fmt = (n) => new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

    const getStatusTextClass = (status) => {
        switch (status) {
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

            {/* Bottom-sheet User Purchases drawer */}
            <div className="relative bg-white rounded-t-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-slideUp z-10">
                
                {/* Grab handle indicator */}
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
                    <div className="flex items-center gap-3">
                        <img
                            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100'}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-150"
                        />
                        <div className="flex flex-col text-left">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">{user.name}</h3>
                            <span className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">{user.email}</span>
                        </div>
                    </div>
                    <div className="w-9" />
                </div>

                {/* Scrollable Content */}
                <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-5">
                    
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Purchase Logs ({userOrders.length})
                    </h4>

                    {userOrders.length === 0 ? (
                        <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/20">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-150 flex items-center justify-center mx-auto mb-3 text-slate-400">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                            <p className="text-slate-800 text-xs font-bold mb-1">No orders found</p>
                            <p className="text-slate-450 text-[10px] uppercase font-semibold">This customer hasn't purchased anything yet.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {userOrders.map((order) => (
                                <div 
                                    key={order.id} 
                                    className="border border-slate-100 bg-slate-50/15 rounded-xl p-4 flex flex-col gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.01)]"
                                >
                                    {/* Order info header */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs font-black text-slate-850">{order.id}</span>
                                            <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase mt-0.5">
                                                <Calendar className="w-2.5 h-2.5" />
                                                {order.date}
                                            </div>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-wider ${getStatusTextClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="h-px bg-slate-100/80" />

                                    {/* Products list */}
                                    <div className="flex flex-col gap-2.5">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <img
                                                    src={item.product?.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=100'}
                                                    alt={item.product?.name || 'Product'}
                                                    className="w-8 h-8 rounded-md object-cover border border-slate-100 bg-slate-50"
                                                />
                                                <div className="flex-1 min-w-0 text-left">
                                                    <h5 className="text-[11px] font-bold text-slate-800 truncate">{item.product?.name || 'Item'}</h5>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">
                                                        Size: {item.size || 'M'} &nbsp;·&nbsp; Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <span className="text-[11px] font-black text-slate-900">
                                                    ₦{fmt((item.product?.price || item.price || 0) * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="h-px bg-slate-100/80" />

                                    {/* Shipping metadata */}
                                    <div className="flex flex-col gap-1 text-[9.5px] text-slate-450 font-bold uppercase tracking-wider text-left">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                            <span className="truncate">
                                                {typeof order.shippingAddress === 'object'
                                                    ? `${order.shippingAddress.name}, ${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}`
                                                    : order.shippingAddress || 'No shipping details'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CreditCard className="w-3 h-3 text-slate-400 shrink-0" />
                                            <span>{order.paymentMethod || 'Credit Card'}</span>
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-100/80" />

                                    {/* Cost summation */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Total Value</span>
                                        <span className="text-xs font-black text-slate-950">
                                            ₦{fmt(typeof order.total === 'number' ? order.total : parseFloat(order.total) || 0)}
                                        </span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div>
        </div>,
        document.body
    );
}

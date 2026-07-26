import React from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingBag, Calendar, CreditCard, MapPin } from 'lucide-react';

export default function UserPurchasesDrawer({ isOpen, onClose, user, userOrders }) {
    if (!isOpen || !user) return null;

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Processing':
                return 'bg-amber-50 border-amber-100 text-amber-700';
            case 'Shipped':
                return 'bg-blue-50 border-blue-100 text-blue-700';
            case 'Delivered':
                return 'bg-emerald-50 border-emerald-100 text-emerald-700';
            case 'Cancelled':
                return 'bg-red-50 border-red-100 text-red-700';
            default:
                return 'bg-slate-50 border-slate-200 text-slate-700';
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out"
                onClick={onClose}
            ></div>

            {/* Slide-over Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full md:max-w-md w-full flex pl-10 md:pl-0">
                <div className="w-full bg-white h-full flex flex-col shadow-2xl relative animate-slideIn">
                    {/* Header */}
                    <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-slate-50 shadow-sm"
                            />
                            <div>
                                <h3 className="font-black text-slate-900 text-sm">{user.name}</h3>
                                <p className="text-slate-500 text-[10px] font-semibold">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Scrollable Purchase List */}
                    <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
                        <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                                <ShoppingBag className="w-3.5 h-3.5" />
                                Order Logs ({userOrders.length})
                            </h4>

                            {userOrders.length === 0 ? (
                                <div className="border border-dashed border-slate-200 rounded-2xl p-6 text-center">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-2.5">
                                        <ShoppingBag className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <p className="text-slate-800 text-xs font-bold mb-1">No orders found</p>
                                    <p className="text-slate-400 text-[10px]">This customer hasn't checked out any purchases yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {userOrders.map((order) => {
                                        return (
                                            <div 
                                                key={order.id} 
                                                className="border border-slate-100 bg-slate-50/20 rounded-xl p-3 flex flex-col gap-3 shadow-sm animate-fadeIn"
                                            >
                                                {/* Card Top */}
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-[11px] font-black text-slate-900">{order.id}</span>
                                                        <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase mt-0.5">
                                                            <Calendar className="w-2.5 h-2.5" />
                                                            {order.date}
                                                        </div>
                                                    </div>
                                                    <span className={`text-[8px] font-black border px-2 py-0.5 rounded-full ${getStatusClasses(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>

                                                <div className="h-px bg-slate-100"></div>

                                                {/* Items List */}
                                                <div className="space-y-2">
                                                    {order.items?.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-2.5">
                                                            <img
                                                                src={item.product?.image}
                                                                alt={item.product?.name}
                                                                className="w-8 h-8 rounded-md object-cover border border-slate-100 bg-slate-50"
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <h5 className="text-[11px] font-bold text-slate-800 line-clamp-1">{item.product?.name}</h5>
                                                                <p className="text-[9px] text-slate-400 font-bold mt-0.5">
                                                                    Size: <span className="text-slate-700">{item.size}</span> &bull; Qty: <span className="text-slate-700">{item.quantity}</span>
                                                                </p>
                                                            </div>
                                                            <span className="text-[11px] font-black text-slate-900">${(item.product?.price * item.quantity).toFixed(2)}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="h-px bg-slate-100"></div>

                                                {/* Details Row */}
                                                <div className="flex flex-col gap-1 text-[10px] text-slate-500 font-medium">
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                                        <span className="line-clamp-1">{order.shippingAddress}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <CreditCard className="w-3 h-3 text-slate-400 shrink-0" />
                                                        <span>{order.paymentMethod}</span>
                                                    </div>
                                                </div>

                                                <div className="h-px bg-slate-100"></div>

                                                {/* Total Cost */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Charge</span>
                                                    <span className="text-xs font-black text-blue-600">{order.total}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

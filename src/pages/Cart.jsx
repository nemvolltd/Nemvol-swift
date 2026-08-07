import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import { useCart, useUpdateCartQty, useRemoveFromCart } from '../hooks/useCart';

export default function Cart() {
    const navigate = useNavigate();
    const { data: cartItems = [], isLoading } = useCart();
    const { mutate: updateQty } = useUpdateCartQty();
    const { mutate: removeFromCart } = useRemoveFromCart();

    const [discountCode, setDiscountCode] = useState('');

    const handleQuantityChange = (productId, size, currentQty, delta) => {
        if (currentQty + delta < 1) {
            removeFromCart({ productId, size });
        } else {
            updateQty({ productId, size, delta });
        }
    };

    const handleRemove = (productId, size) => {
        removeFromCart({ productId, size });
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
    const total = subtotal;

    if (isLoading) {
        return (
            <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6">
                <div className="w-8 h-8 border-3 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-3" />
                <p className="text-sm text-slate-500">Loading your cart...</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-slate-50/40 pb-36">
            <div className="max-w-xl mx-auto px-4 pt-4 text-left">
                
                {/* ── Header ── */}
                <div className="flex items-center justify-between mb-6 relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-800" strokeWidth={1.8} />
                    </button>
                    
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-slate-900">
                        My Cart
                    </h1>
                    
                    <div className="w-10 h-10" /> {/* Spacer */}
                </div>

                {cartItems.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl space-y-6 px-6 shadow-sm">
                        <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto shadow-[0_4px_16px_rgba(249,115,22,0.1)]">
                            <ShoppingBag className="w-8 h-8" strokeWidth={1.8} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold text-slate-900">Your cart is empty</h2>
                            <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                                Looks like you haven't added anything to your cart yet. Let's find some amazing style!
                            </p>
                        </div>
                        <Link 
                            to="/" 
                            className="inline-flex px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-full shadow-[0_4px_16px_rgba(249,115,22,0.3)] transition-all"
                        >
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    /* Cart Layout */
                    <div className="space-y-4">
                        {/* Cart Items List */}
                        <div className="space-y-3.5">
                            {cartItems.map((item, idx) => {
                                const prod = item.product || {};
                                return (
                                    <div
                                        key={`${prod.id}-${item.size}-${idx}`}
                                        className="flex items-center gap-3.5 p-3 rounded-2xl border border-slate-100/80 bg-white shadow-sm hover:shadow-md transition-all relative"
                                    >
                                        {/* Product Image Container */}
                                        <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                                            {prod.image ? (
                                                <img
                                                    src={prod.image}
                                                    alt={prod.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xl">🛍️</span>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0 pr-2">
                                            <div className="flex items-start justify-between gap-1">
                                                <h3 className="font-bold text-slate-800 text-[14px] leading-tight truncate">
                                                    {prod.name}
                                                </h3>
                                                
                                                {/* Trash icon with light orange background */}
                                                <button
                                                    onClick={() => handleRemove(prod.id, item.size)}
                                                    className="p-1.5 text-orange-500 hover:text-orange-600 hover:bg-orange-100/60 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" strokeWidth={2} />
                                                </button>
                                            </div>
                                            
                                            <p className="text-[11px] text-slate-400 font-medium mt-0.5 capitalize">
                                                {prod.category || 'Fashion'} {item.size ? `• Size ${item.size}` : ''}
                                            </p>
                                            
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-[14px] font-bold text-slate-900">
                                                    ${(prod.price || 0).toFixed(2)}
                                                </span>

                                                {/* Quantity Control Pill */}
                                                <div className="flex items-center bg-slate-100 rounded-full overflow-hidden h-7">
                                                    <button
                                                        onClick={() => handleQuantityChange(prod.id, item.size, item.quantity, -1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 text-sm font-light hover:bg-slate-200 transition-colors border-none cursor-pointer bg-transparent"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-6 text-center text-[12px] font-bold text-slate-800">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQuantityChange(prod.id, item.size, item.quantity, 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 text-sm font-light hover:bg-slate-200 transition-colors border-none cursor-pointer bg-transparent"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary & Checkout Card */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-5 mt-6">
                            {/* Discount Code Input */}
                            <div className="relative flex items-center bg-slate-100 rounded-full h-12 px-2">
                                <input
                                    type="text"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                    placeholder="Enter Discount Code"
                                    className="flex-1 bg-transparent border-none text-xs text-slate-700 placeholder-slate-400 pl-4 font-normal focus:outline-none"
                                />
                                <button
                                    onClick={() => alert('Code applied successfully!')}
                                    className="h-9 px-5 bg-transparent text-orange-500 hover:text-orange-600 text-xs font-bold transition-all border-none cursor-pointer"
                                >
                                    Apply
                                </button>
                            </div>

                            {/* Price break-down */}
                            <div className="space-y-3 pt-1">
                                <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                                    <span>Subtotal</span>
                                    <span className="text-[14px] text-slate-800">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-slate-100 my-2" />
                                <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                                    <span>Total</span>
                                    <span className="text-[15px]">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <Link
                                to="/checkout"
                                className="w-full h-12 inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold text-[14px] rounded-full shadow-[0_4px_16px_rgba(249,115,22,0.3)] transition-all cursor-pointer border-none"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function CheckoutSummary({ subtotal, deliveryFee, tax, total, onConfirm, isLoading }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="px-5 pt-5 pb-3 border-b border-slate-50">
                <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">Order Summary</h2>
            </div>

            <div className="px-5 py-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Subtotal</span>
                    <span className="text-xs font-bold text-slate-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Delivery Fee</span>
                    <span className="text-xs font-bold text-slate-900">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">VAT / Tax</span>
                    <span className="text-xs font-bold text-slate-900">₦{tax.toLocaleString()}</span>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-slate-100 my-1" />

                <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-slate-900">Total</span>
                    <span className="text-base font-black text-orange-500">₦{total.toLocaleString()}</span>
                </div>
            </div>

            {/* Secure badge */}
            <div className="mx-5 mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2} />
                <span className="text-[10px] font-bold text-emerald-700 leading-tight">
                    Secured by 256-bit SSL encryption. Your payment info is safe.
                </span>
            </div>

            {/* Desktop Confirm Button */}
            <div className="hidden md:block px-5 pb-5">
                <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={`w-full h-13 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center shadow-[0_4px_16px_rgba(249,115,22,0.30)] border-none cursor-pointer ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing Order...
                        </span>
                    ) : (
                        'Confirm Order'
                    )}
                </button>
            </div>
        </div>
    );
}

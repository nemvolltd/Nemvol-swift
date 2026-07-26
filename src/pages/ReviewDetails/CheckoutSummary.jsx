import React from 'react';

export default function CheckoutSummary({ subtotal, deliveryFee, tax, total, onConfirm, isLoading }) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Order Summary</h2>

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Subtotal</span>
                    <span className="text-sm font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Delivery Fee</span>
                    <span className="text-sm font-bold text-slate-900">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Tax</span>
                    <span className="text-sm font-bold text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px w-full bg-slate-100 my-1"></div>
                <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-900">Total</span>
                    <span className="text-base font-bold text-blue-600">${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Desktop Confirm Button (Inline) */}
            <div className="hidden md:block mt-6">
                <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={`w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/10 ${
                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                >
                    {isLoading ? 'Processing Order...' : 'Confirm Order'}
                </button>
            </div>
        </div>
    );
}


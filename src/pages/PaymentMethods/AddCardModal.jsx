import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';

export default function AddCardModal({ isOpen, onClose, onAdd }) {
    const [number, setNumber] = useState('');
    const [holder, setHolder] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [brand, setBrand] = useState('Mastercard');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    // Auto-detect brand and format card number
    const handleNumberChange = (e) => {
        let val = e.target.value.replace(/\D/g, ''); // Digits only
        if (val.length > 16) val = val.slice(0, 16);

        // Format with spaces
        let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
        setNumber(formatted);

        // Detect Card Brand
        if (val.startsWith('4')) {
            setBrand('Visa');
        } else if (val.startsWith('5')) {
            setBrand('Mastercard');
        } else {
            setBrand('Mastercard');
        }
    };

    const handleExpiryChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 4) val = val.slice(0, 4);

        if (val.length > 2) {
            setExpiry(`${val.slice(0, 2)}/${val.slice(2)}`);
        } else {
            setExpiry(val);
        }
    };

    const handleCvvChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 3) val = val.slice(0, 3);
        setCvv(val);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (number.replace(/\s/g, '').length < 16) {
            setError('Please enter a valid 16-digit card number.');
            return;
        }
        if (!holder.trim()) {
            setError('Please enter the cardholder name.');
            return;
        }
        if (expiry.length < 5) {
            setError('Please enter a valid expiry date (MM/YY).');
            return;
        }
        if (cvv.length < 3) {
            setError('Please enter a valid CVV.');
            return;
        }

        onAdd({
            number,
            holder,
            expiry,
            cvv,
            brand,
            isDefault: false
        });

        // Reset
        setNumber('');
        setHolder('');
        setExpiry('');
        setCvv('');
        setBrand('Mastercard');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[75vh] animate-scaleIn">
                
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">Add Payment Method</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Container (Scrollable) */}
                <form onSubmit={handleSubmit} className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-4">
                    {/* Real-time Visual Card Preview */}
                    <div className="w-full aspect-[1.58/1] rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-800 p-5 text-white flex flex-col justify-between shadow-lg shadow-blue-600/10 relative overflow-hidden flex-shrink-0">
                        {/* Background Decorative Rings */}
                        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/5 border border-white/10 pointer-events-none" />
                        <div className="absolute -right-20 -bottom-20 w-44 h-44 rounded-full bg-white/5 border border-white/10 pointer-events-none" />

                        <div className="flex justify-between items-start">
                            <CreditCard className="w-6 h-6 opacity-80" strokeWidth={1.5} />
                            {brand === 'Visa' ? (
                                <span className="text-lg font-black italic tracking-widest text-white/95">VISA</span>
                            ) : (
                                <div className="flex gap-1.5 items-center">
                                    <div className="w-4 h-4 rounded-full bg-red-500/90" />
                                    <div className="w-4 h-4 rounded-full bg-amber-500/90 -ml-3" />
                                </div>
                            )}
                        </div>

                        <div className="my-2">
                            <span className="text-base sm:text-lg font-mono tracking-widest block opacity-95">
                                {number || '•••• •••• •••• ••••'}
                            </span>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[8px] uppercase tracking-wider text-white/60">Card Holder</span>
                                <span className="text-[11px] font-bold tracking-wide uppercase line-clamp-1 max-w-[200px]">
                                    {holder || 'Cardholder Name'}
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5 text-right">
                                <span className="text-[8px] uppercase tracking-wider text-white/60">Expires</span>
                                <span className="text-[11px] font-bold tracking-wide font-mono">
                                    {expiry || 'MM/YY'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="text-xs font-semibold text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Card Number</label>
                        <input
                            type="text"
                            placeholder="xxxx xxxx xxxx xxxx"
                            value={number}
                            onChange={handleNumberChange}
                            maxLength={19}
                            className="h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cardholder Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Lana Johnson"
                            value={holder}
                            onChange={(e) => setHolder(e.target.value)}
                            className="h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all uppercase"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Expiry Date</label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={handleExpiryChange}
                                maxLength={5}
                                className="h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-center"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CVV</label>
                            <input
                                type="password"
                                placeholder="•••"
                                value={cvv}
                                onChange={handleCvvChange}
                                maxLength={3}
                                className="h-10 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-center"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center gap-2.5 mt-2 py-2 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-9.5 sm:h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 h-9.5 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10"
                        >
                            Save Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

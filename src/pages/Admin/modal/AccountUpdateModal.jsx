import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CreditCard, AlertCircle } from 'lucide-react';

export default function AccountUpdateModal({ isOpen, onClose, currentValue, onSave }) {
    const [accountNum, setAccountNum] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setAccountNum(currentValue || '');
            setError('');
        }
    }, [isOpen, currentValue]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!accountNum.trim()) {
            setError('Account number cannot be empty.');
            return;
        }

        if (!/^\d+$/.test(accountNum.trim())) {
            setError('Please enter a valid numeric account number.');
            return;
        }

        onSave(accountNum.trim());
    };

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn select-none">
            
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Box */}
            <form 
                onSubmit={handleSubmit}
                className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col animate-scaleUp z-10"
            >
                {/* Header Icon */}
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 self-center shrink-0">
                    <CreditCard className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1 text-center">
                    Update Account Number
                </h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-5 text-center">
                    Payout Destination Setting
                </p>

                {error && (
                    <div className="p-3 bg-red-50 text-red-750 text-xs font-bold rounded-xl flex items-center gap-2 border border-red-100 mb-4">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Input Field */}
                <div className="flex flex-col gap-1.5 mb-6 text-left">
                    <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Account Number</label>
                    <input
                        type="text"
                        required
                        value={accountNum}
                        onChange={(e) => setAccountNum(e.target.value)}
                        placeholder="e.g. 0123456789"
                        className="w-full h-11 px-4 border border-slate-200 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-black rounded-xl focus:border-slate-800 focus:outline-none transition-all"
                    />
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-850 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="h-10.5 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none"
                    >
                        Save Setting
                    </button>
                </div>
            </form>

        </div>,
        document.body
    );
}

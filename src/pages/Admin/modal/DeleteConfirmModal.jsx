import React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName, title = "Delete Confirmation" }) {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn select-none">
            
            {/* Overlay click to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Box */}
            <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col items-center text-center animate-scaleUp z-10">
                
                {/* Warning Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
                    {title}
                </h3>
                
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                    Are you sure you want to permanently delete <span className="font-bold text-slate-800">"{itemName}"</span>? This catalog database action cannot be undone.
                </p>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="h-10 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>,
        document.body
    );
}

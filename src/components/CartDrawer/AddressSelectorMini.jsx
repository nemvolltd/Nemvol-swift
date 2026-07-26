import React from 'react';
import { Edit2 } from 'lucide-react';

export default function AddressSelectorMini({ address, onEditClick }) {
    return (
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium mb-1">Delivery Address</span>
                <span className="text-sm font-bold text-slate-900">
                    {address 
                        ? `${address.street}, ${address.city}.` 
                        : 'No shipping address set.'}
                </span>
            </div>
            <button 
                onClick={onEditClick}
                className="text-slate-400 hover:text-slate-900 transition-colors"
                aria-label="Edit address"
            >
                <Edit2 className="w-4 h-4" />
            </button>
        </div>
    );
}

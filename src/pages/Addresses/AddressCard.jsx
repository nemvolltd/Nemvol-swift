import React from 'react';
import { Home, Briefcase, MapPin, Edit2, Trash2 } from 'lucide-react';

export default function AddressCard({ address, onSetDefault, onEdit, onDelete }) {
    const isHome = address.name.toLowerCase() === 'home';
    const isOffice = address.name.toLowerCase() === 'office';

    return (
        <div 
            className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${address.isDefault ? 'border-blue-600' : 'border-slate-100 hover:border-slate-200'
                }`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                        {isHome ? <Home className="w-5 h-5" /> : isOffice ? <Briefcase className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{address.name}</span>
                        {address.isDefault && (
                            <span className="text-[9px] text-blue-600 font-bold uppercase tracking-wider">Default Address</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onEdit}
                        className="text-slate-400 hover:text-slate-900 transition-colors"
                        aria-label="Edit address"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="Delete address"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1 mb-4">
                <p className="text-sm font-bold text-slate-800 leading-relaxed">{address.street}</p>
                <p className="text-xs text-slate-500 font-semibold">{address.city}, {address.state}, {address.country}</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Phone: {address.phone}</p>
            </div>

            {!address.isDefault && (
                <button
                    onClick={onSetDefault}
                    className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-100 transition-colors"
                >
                    Set as Default
                </button>
            )}
        </div>
    );
}

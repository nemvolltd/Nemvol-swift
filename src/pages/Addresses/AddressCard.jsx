import React from 'react';
import { Home, Briefcase, MapPin, Edit2, Trash2, CheckCircle2, Phone } from 'lucide-react';

export default function AddressCard({ address, onSetDefault, onEdit, onDelete }) {
    const label = address.name?.toLowerCase();
    const isHome = label === 'home';
    const isOffice = label === 'office';

    const IconComponent = isHome ? Home : isOffice ? Briefcase : MapPin;
    const iconBg = address.isDefault
        ? 'bg-orange-50'
        : isHome ? 'bg-blue-50' : isOffice ? 'bg-purple-50' : 'bg-slate-50';
    const iconColor = address.isDefault
        ? 'text-orange-500'
        : isHome ? 'text-blue-500' : isOffice ? 'text-purple-500' : 'text-slate-500';

    return (
        <div className={`bg-white rounded-2xl border transition-all shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden ${
            address.isDefault
                ? 'border-orange-200 ring-1 ring-orange-200/60'
                : 'border-slate-100 hover:border-slate-200'
        }`}>
            {/* Card Header */}
            <div className={`flex items-center justify-between px-5 py-3.5 ${
                address.isDefault ? 'bg-orange-50/40 border-b border-orange-100/60' : 'border-b border-slate-50'
            }`}>
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
                        <IconComponent className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-900">{address.name}</span>
                        {address.isDefault && (
                            <div className="flex items-center gap-1 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-orange-500" />
                                <span className="text-[9px] font-black text-orange-500 uppercase tracking-wider">Default</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={onEdit}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent"
                        aria-label="Edit address"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer border-none bg-transparent"
                        aria-label="Delete address"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Address Body */}
            <div className="px-5 py-4 flex flex-col gap-1.5">
                <p className="text-xs font-bold text-slate-800 leading-relaxed">{address.street}</p>
                <p className="text-[11px] text-slate-500 font-semibold">{address.city}, {address.state}, {address.country}</p>
                {address.phone && (
                    <div className="flex items-center gap-1.5 mt-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-400 font-bold">{address.phone}</span>
                    </div>
                )}
            </div>

            {/* Set Default CTA */}
            {!address.isDefault && (
                <div className="px-5 pb-4">
                    <button
                        onClick={onSetDefault}
                        className="w-full py-2.5 rounded-xl border border-orange-200 text-orange-500 hover:bg-orange-50 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer bg-transparent"
                    >
                        Set as Default
                    </button>
                </div>
            )}
        </div>
    );
}

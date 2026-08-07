import React from 'react';

const STATUS_STYLES = {
    // Order statuses
    processing: 'bg-amber-50 text-amber-700 border-amber-100',
    shipped: 'bg-blue-50 text-blue-700 border-blue-100',
    delivered: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    cancelled: 'bg-rose-50 text-rose-700 border-rose-100',
    
    // Product stock / general statuses
    instock: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    outofstock: 'bg-rose-50 text-rose-700 border-rose-100',
    lowstock: 'bg-amber-50 text-amber-700 border-amber-100',
    
    // Default fallback
    default: 'bg-slate-50 text-slate-600 border-slate-200'
};

export default function StatusBadge({ status }) {
    if (!status) return null;
    
    const key = status.toLowerCase().replace(/\s+/g, '');
    const styleClass = STATUS_STYLES[key] || STATUS_STYLES.default;

    return (
        <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full border ${styleClass}`}>
            {status}
        </span>
    );
}


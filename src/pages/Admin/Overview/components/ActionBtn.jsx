import React from 'react';

export default function ActionBtn({ label, icon: Icon, count, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-2 group select-none cursor-pointer"
        >
            <div className="relative w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(15,23,42,0.05)] border border-slate-100/90 group-hover:shadow-[0_4px_18px_rgba(15,23,42,0.1)] group-hover:-translate-y-0.5 group-active:scale-95">
                <Icon className="w-5 h-5 text-slate-700" strokeWidth={1.8} />
                {count !== undefined && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-slate-900 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow">
                        {count}
                    </span>
                )}
            </div>
            <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors uppercase tracking-wider">{label}</span>
        </button>
    );
}

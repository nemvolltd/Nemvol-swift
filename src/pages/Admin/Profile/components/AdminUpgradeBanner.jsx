import React from 'react';

export default function AdminUpgradeBanner({ onUpgradeClick }) {
    return (
        <div className="bg-[#1C1C1E] rounded-2xl p-5 flex items-center gap-4 text-white relative">
            {/* Sparkle/Star icon matching mockup directly */}
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 text-blue-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
                </svg>
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[14px] font-semibold tracking-wide">Upgrade to Pro</span>
                <span className="text-[11px] text-slate-400 mt-1 leading-snug font-normal">
                    Unlock shared budgets, AI insights, receipt scanning, and advanced analytics.
                </span>
            </div>

            <button 
                onClick={onUpgradeClick}
                className="bg-white/10 hover:bg-white/15 text-white text-xs font-semibold px-4 py-2.5 rounded-full border border-white/5 transition-all shrink-0 cursor-pointer flex items-center gap-1"
            >
                <span>Upgrade</span>
                <span className="text-[10px] font-light">&gt;</span>
            </button>
        </div>
    );
}

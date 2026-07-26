import React from 'react';

export default function StepIndicator({ currentStep }) {
    return (
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
                <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[9px] font-black transition-all ${
                    currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                    1
                </span>
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider hidden min-[380px]:inline ${currentStep === 1 ? 'text-blue-600' : 'text-slate-500'}`}>Info</span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200"></div>
            <div className="flex items-center gap-1.5">
                <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[9px] font-black transition-all ${
                    currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                    2
                </span>
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider hidden min-[380px]:inline ${currentStep === 2 ? 'text-blue-600' : 'text-slate-500'}`}>Pricing</span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200"></div>
            <div className="flex items-center gap-1.5">
                <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[9px] font-black transition-all ${
                    currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                    3
                </span>
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider hidden min-[380px]:inline ${currentStep === 3 ? 'text-blue-600' : 'text-slate-500'}`}>Media</span>
            </div>
        </div>
    );
}

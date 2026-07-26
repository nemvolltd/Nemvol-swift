import React from 'react';

export default function SizeSelector({ sizes, selectedSize, onSelectSize }) {
    if (!sizes || sizes.length === 0) return null;

    return (
        <div className="flex flex-col mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-900">Select Size</span>
                <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    Size Guide
                </button>
            </div>
            <div className="grid grid-cols-5 gap-2.5">
                {sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                        <button
                            key={size}
                            onClick={() => onSelectSize(size)}
                            className={`h-11 rounded-xl flex items-center justify-center text-xs font-bold border transition-all duration-300 ${isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/10 scale-[1.03]'
                                : 'bg-slate-50 text-slate-600 border-slate-200/40 hover:bg-slate-100 hover:text-slate-800'
                                }`}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

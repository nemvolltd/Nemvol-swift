import React from 'react';

export default function StepPricing({
    price,
    setPrice,
    originalPrice,
    setOriginalPrice,
    stock,
    setStock
}) {
    return (
        <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Price */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Price ($)</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="h-10 px-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
            </div>

            {/* Original Price */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Original Price ($)</label>
                <input
                    type="number"
                    step="0.01"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="Optional (displays line-through markdown)"
                    className="h-10 px-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
            </div>

            {/* Stock Level */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stock Level</label>
                <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="e.g. 15"
                    className="h-10 px-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
            </div>
        </div>
    );
}

import React from 'react';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '39', '40', '41', '42', '43', '44', 'One Size'];

export default function StepPricing({
    price, setPrice,
    originalPrice, setOriginalPrice,
    stock, setStock,
    sizes, handleSizeToggle
}) {
    return (
        <div className="flex flex-col gap-5 animate-fadeIn text-left">
            <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Pricing & Stock Inventory</h4>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Values in NGN (₦)</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Sale Price (₦)</label>
                    <input
                        type="number"
                        required
                        min="0.01"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-11 px-3.5 border border-slate-200 bg-slate-50/30 focus:bg-white text-slate-850 text-xs font-bold rounded-xl focus:border-slate-900 focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Original Price (₦)</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-11 px-3.5 border border-slate-200 bg-slate-50/30 focus:bg-white text-slate-850 text-xs font-bold rounded-xl focus:border-slate-900 focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Stock Units</label>
                    <input
                        type="number"
                        required
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="15"
                        className="w-full h-11 px-3.5 border border-slate-200 bg-slate-50/30 focus:bg-white text-slate-850 text-xs font-bold rounded-xl focus:border-slate-900 focus:outline-none"
                    />
                </div>
            </div>

            {/* Size selector chips */}
            <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                    <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Available Sizes</label>
                    <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                        {sizes.length} selected
                    </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {AVAILABLE_SIZES.map(sz => {
                        const active = sizes.includes(sz);
                        return (
                            <button
                                key={sz}
                                type="button"
                                onClick={() => handleSizeToggle(sz)}
                                className={`h-8.5 px-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                                    active 
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs scale-105' 
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                                }`}
                            >
                                {sz}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

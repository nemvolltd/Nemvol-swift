import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function ProductInfo({ name, category, price, originalPrice, description }) {
    return (
        <div className="flex flex-col mb-6">
            {/* Category and Stock Status Row */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{category}</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock - Ships Tomorrow
                </span>
            </div>

            {/* Product Title */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{name}</h2>

            {/* Ratings row */}
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                </div>
                <span className="text-xs font-bold text-slate-900">4.9</span>
                <span className="text-xs text-slate-400 font-medium">(48 reviews)</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl md:text-3xl font-black text-blue-600">${price.toFixed(2)}</span>
                {originalPrice && (
                    <>
                        <span className="text-sm md:text-base font-medium text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                        </span>
                    </>
                )}
            </div>

            {/* Main Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {description}
            </p>

            {/* Core Trust Badges */}
            <div className="grid grid-cols-3 gap-3 border-y border-slate-100 py-4 mb-6">
                <div className="flex flex-col items-center text-center gap-1">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] font-bold text-slate-700">100% Original</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] font-bold text-slate-700">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] font-bold text-slate-700">30-Day Returns</span>
                </div>
            </div>

            {/* Product Specifications Accordion */}
            <div className="flex flex-col border-t border-slate-100">
                <AccordionItem title="Details & Specifications">
                    <ul className="list-disc list-inside flex flex-col gap-1.5 text-slate-500 font-medium pl-1">
                        <li>Premium organically sourced breathable fabric.</li>
                        <li>High quality stitching and reinforced seams.</li>
                        <li>Comfortable regular fit perfect for daily wear.</li>
                        <li>Machine wash cold, air dry or tumble dry low.</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title="Size & Fit Info">
                    <p className="text-slate-500 font-medium mb-1">
                        This item runs true to size. We recommend taking your standard size.
                    </p>
                    <p className="text-slate-500 font-medium">
                        Model is 6'1" (185 cm) and is wearing size Medium (M).
                    </p>
                </AccordionItem>
                <AccordionItem title="Shipping & Returns">
                    <p className="text-slate-500 font-medium mb-2">
                        Enjoy free standard shipping on orders over $100.
                    </p>
                    <p className="text-slate-500 font-medium">
                        Return window is open for 30 days from delivery date. Return label is pre-packed inside shipment boxes.
                    </p>
                </AccordionItem>
            </div>
        </div>
    );
}

function AccordionItem({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-100 py-3.5">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full text-left focus:outline-none"
            >
                <span className="text-xs uppercase tracking-wider font-bold text-slate-800">{title}</span>
                <span className="text-sm text-slate-400 font-bold transition-transform duration-300">
                    {isOpen ? '−' : '+'}
                </span>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                <div className="overflow-hidden text-xs md:text-sm text-slate-600 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { Edit2, Layers, Trash2 } from 'lucide-react';

export default function ProductCard({ product, onEdit, onDelete, onVariants }) {
    const fmt = (n) => new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

    // Dynamic swatch colors corresponding to product mock categories
    const getProductColor = (id) => {
        switch (id) {
            case 'prod-101': return { name: 'Sand', hex: '#d7ccc8' };
            case 'prod-102': return { name: 'White', hex: '#f8fafc' };
            case 'prod-103': return { name: 'Indigo', hex: '#1a237e' };
            case 'prod-104': return { name: 'Tan', hex: '#bcaaa4' };
            default: return { name: 'Black', hex: '#111111' };
        }
    };

    const colorInfo = getProductColor(product.id);

    // Clean status badge: simple text indicator with dot
    const renderStatusBadge = () => {
        if (product.stock === 0) {
            return (
                <div className="flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-wider text-rose-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>Out of Stock</span>
                </div>
            );
        }
        if (product.stock < 10) {
            return (
                <div className="flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-wider text-amber-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Low Stock</span>
                </div>
            );
        }
        return (
            <div className="flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-wider text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Active</span>
            </div>
        );
    };

    return (
        <div className="flex items-center justify-between py-4 border-b border-slate-100/60 hover:bg-slate-50/10 px-1 transition-all group select-none">
            {/* Left side: Thumbnail + Description */}
            <div className="flex items-center gap-4 flex-grow mr-4">
                
                {/* Clean square image box with minimal rounding */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-55/40 rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden border border-slate-100/40">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center rounded-md"
                    />
                </div>

                {/* Details Stack */}
                <div className="flex flex-col gap-0.5 items-start">
                    {/* Status Indicator */}
                    {renderStatusBadge()}

                    {/* Product Title */}
                    <h4 className="text-xs sm:text-sm font-bold text-slate-850 leading-tight group-hover:text-black transition-colors" title={product.name}>
                        {product.name}
                    </h4>

                    {/* Sub-details (Price · Color Swatch · Stocks) */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span className="text-slate-800 font-black">₦{fmt(product.price)}</span>
                        <span className="text-slate-250 font-normal">·</span>
                        <span className="inline-flex items-center gap-1">
                            <span 
                                className="w-2 h-2 rounded-sm border border-slate-200/40 shrink-0" 
                                style={{ backgroundColor: colorInfo.hex }} 
                            />
                            <span>{colorInfo.name}</span>
                        </span>
                        <span className="text-slate-250 font-normal">·</span>
                        <span>{product.stock} stocks</span>
                    </div>
                </div>

            </div>

            {/* Right side: Flat borderless action buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
                <button
                    onClick={() => onVariants(product)}
                    className="p-1.5 bg-transparent hover:text-slate-900 text-slate-400 transition-colors cursor-pointer border-none rounded-none"
                    title="Manage SKUs"
                >
                    <Layers className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onEdit(product)}
                    className="p-1.5 bg-transparent hover:text-slate-900 text-slate-400 transition-colors cursor-pointer border-none rounded-none"
                    title="Edit Details"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(product)}
                    className="p-1.5 bg-transparent hover:text-red-600 text-slate-400 transition-colors cursor-pointer border-none rounded-none"
                    title="Delete Product"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

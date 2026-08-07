import React from 'react';
import { Check, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItemRow({ item, onToggleSelection, onQuantityChange, onRemove }) {
    const { product, size, quantity, selected } = item;

    return (
        <div className="flex gap-4">
            {/* Checkbox */}
            <div className="pt-8">
                <button
                    onClick={onToggleSelection}
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${selected ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-slate-50'
                        }`}
                >
                    {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </button>
            </div>

            {/* Image */}
            <div className="w-24 h-32 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between py-1 flex-1">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{product.name}</h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-500 mb-1.5">
                        {product.sku && (
                            <span>SKU: <span className="font-bold text-slate-700">{product.sku}</span></span>
                        )}
                        {product.attributes && Object.entries(product.attributes).map(([k, v]) => (
                            <span key={k} className="capitalize">{k}: <span className="font-bold text-slate-700">{v}</span></span>
                        ))}
                        {!product.sku && (!product.attributes || Object.keys(product.attributes).length === 0) && (
                            <span>Size: <span className="font-bold text-slate-700">{size}</span></span>
                        )}
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-sm font-bold text-slate-900">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="text-xs font-medium text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 border border-slate-200 rounded-full px-3 py-1.5">
                        <button
                            onClick={() => onQuantityChange(-1)}
                            className="text-slate-400 hover:text-slate-900 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </button>
                        <span className="text-sm font-bold text-slate-900 w-4 text-center">{quantity}</span>
                        <button
                            onClick={() => onQuantityChange(1)}
                            className="text-slate-400 hover:text-slate-900 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </button>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={onRemove}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

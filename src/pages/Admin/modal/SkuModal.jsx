import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Trash2, Edit2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function SkuModal({ isOpen, onClose, product }) {
    const productId = product?.id;

    const [variants, setVariants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form States
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [editingVariant, setEditingVariant] = useState(null);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (!isOpen || !productId) return;
        
        setIsLoading(true);
        const timer = setTimeout(() => {
            const key = `admin_variants_${productId}`;
            const localData = localStorage.getItem(key);
            if (localData) {
                setVariants(JSON.parse(localData));
            } else {
                const initial = (product.sizes || ['S', 'M', 'L']).map((sz, idx) => ({
                    id: `var-${productId}-${idx}`,
                    sku: `${product.name.substring(0, 3).toUpperCase()}-${sz}-${100 + idx}`,
                    price: product.price,
                    attributes: {
                        color: 'Default',
                        size: sz
                    }
                }));
                localStorage.setItem(key, JSON.stringify(initial));
                setVariants(initial);
            }
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, [isOpen, productId, product]);

    useEffect(() => {
        if (editingVariant) {
            setSku(editingVariant.sku);
            setPrice(editingVariant.price.toString());
            setColor(editingVariant.attributes?.color || '');
            setSize(editingVariant.attributes?.size || '');
        } else {
            resetForm();
        }
    }, [editingVariant]);

    const resetForm = () => {
        setSku('');
        setPrice('');
        setColor('');
        setSize('');
        setEditingVariant(null);
        setFormError('');
    };

    if (!isOpen || !product) return null;

    const saveVariants = (updated) => {
        setVariants(updated);
        localStorage.setItem(`admin_variants_${productId}`, JSON.stringify(updated));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');

        if (!sku.trim()) {
            setFormError('SKU is required.');
            return;
        }
        if (!price || parseFloat(price) <= 0) {
            setFormError('Valid price is required.');
            return;
        }

        const variantData = {
            id: editingVariant ? editingVariant.id : `var-${productId}-${Date.now()}`,
            sku: sku.trim().toUpperCase(),
            price: parseFloat(price),
            attributes: {
                color: color.trim() || undefined,
                size: size.trim() || undefined
            }
        };

        let updated;
        if (editingVariant) {
            updated = variants.map(v => v.id === editingVariant.id ? variantData : v);
        } else {
            updated = [...variants, variantData];
        }

        saveVariants(updated);
        resetForm();
    };

    const handleDelete = (variantId) => {
        if (window.confirm('Are you sure you want to delete this variant SKU?')) {
            const updated = variants.filter(v => v.id !== variantId);
            saveVariants(updated);
        }
    };

    const fmt = (n) => new Intl.NumberFormat('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn select-none">
            
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Bottom-sheet Sku config drawer */}
            <div className="relative bg-white rounded-t-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-slideUp z-10">
                
                {/* Drag Indicator */}
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-2.5 shrink-0" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-700 transition-colors border-none"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                            SKU Variants Manager
                        </h3>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 line-clamp-1 max-w-[280px]">
                            {product.name}
                        </span>
                    </div>
                    <div className="w-9" />
                </div>

                {/* Body split-pane layout */}
                <div className="flex-grow overflow-y-auto flex flex-col md:flex-row min-h-0">
                    
                    {/* Left Pane: Create/Edit variant form */}
                    <div className="w-full md:w-5/12 p-6 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                {editingVariant ? 'Update SKU' : 'New Configuration'}
                            </span>

                            {formError && (
                                <div className="p-3 bg-red-50 text-red-750 text-xs font-bold rounded-xl flex items-center gap-2 border border-red-100">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{formError}</span>
                                </div>
                            )}

                            {/* SKU Code Input */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">SKU Code</label>
                                <input
                                    type="text"
                                    required
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    placeholder="e.g. PRD-BLK-001"
                                    className="w-full h-10 px-3.5 border border-slate-200 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-800 focus:outline-none transition-all"
                                />
                            </div>

                            {/* Price */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Variant Price (₦)</label>
                                <input
                                    type="number"
                                    required
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="e.g. 45000.00"
                                    className="w-full h-10 px-3.5 border border-slate-200 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-800 focus:outline-none transition-all"
                                />
                            </div>

                            {/* Attributes */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Color Option</label>
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        placeholder="e.g. Black"
                                        className="w-full h-10 px-3.5 border border-slate-200 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-800 focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Size Option</label>
                                    <input
                                        type="text"
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                        placeholder="e.g. XL"
                                        className="w-full h-10 px-3.5 border border-slate-200 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-800 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-10.5 bg-slate-900 hover:bg-black text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span>{editingVariant ? 'Save SKU Changes' : 'Create Variant'}</span>
                            </button>

                            {editingVariant && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="w-full h-10 border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Right Pane: List of configured active SKUs */}
                    <div className="w-full md:w-7/12 p-6 bg-slate-50/30 flex flex-col min-h-0 overflow-y-auto">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                            Active Configurations ({variants.length})
                        </h4>

                        {isLoading ? (
                            <div className="flex flex-col gap-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-16 bg-white border border-slate-100 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : variants.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {variants.map((v) => (
                                    <div
                                        key={v.id}
                                        className="bg-white border border-slate-100/80 hover:border-slate-200 rounded-xl p-4 flex items-center justify-between transition-all"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-800">{v.sku}</span>
                                                <span className="text-[9px] font-black text-slate-700 bg-slate-100/70 border border-slate-150 px-1.5 py-0.5 rounded">
                                                    ₦{fmt(v.price)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                {Object.entries(v.attributes || {}).map(([key, val]) => {
                                                    if (!val) return null;
                                                    return (
                                                        <span
                                                            key={key}
                                                            className="text-[9px] text-slate-400 font-bold uppercase"
                                                        >
                                                            {key}: <span className="text-slate-600 font-black">{val}</span>
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => setEditingVariant(v)}
                                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer border-none"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(v.id)}
                                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-550 flex items-center justify-center transition-all cursor-pointer border-none"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 bg-white border border-slate-100 rounded-xl text-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                                No variants configured yet.
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>,
        document.body
    );
}

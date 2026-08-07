import React, { useState } from 'react';
import { Plus, X, Tag, Sliders, ChevronDown, ChevronUp, Check } from 'lucide-react';

const PRESET_BRANDS = ['Nike', 'Adidas', 'Zara', 'Gucci', 'Uniqlo', 'Nemvol', 'Puma', 'H&M'];
const PRESET_COLORS = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#1E293B' },
    { name: 'Beige', hex: '#E5E0D8' },
    { name: 'Olive', hex: '#556B2F' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Brown', hex: '#78350F' }
];
const PRESET_MATERIALS = ['Cotton', 'Linen', 'Leather', 'Denim', 'Silk', 'Polyester', 'Wool', 'Cashmere'];

export default function StepAttributes({
    brand, setBrand,
    color, setColor,
    material, setMaterial,
    features, setFeatures,
    tags, setTags
}) {
    const [featureInput, setFeatureInput] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [customBrandMode, setCustomBrandMode] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    // Feature handlers
    const handleAddFeature = () => {
        if (!featureInput.trim()) return;
        setFeatures([...features, featureInput.trim()]);
        setFeatureInput('');
    };

    const handleRemoveFeature = (idx) => {
        setFeatures(features.filter((_, i) => i !== idx));
    };

    // Tag handlers
    const handleAddTag = () => {
        if (!tagInput.trim()) return;
        const cleaned = tagInput.trim().replace(/^#/, '').toLowerCase();
        if (!tags.includes(cleaned)) {
            setTags([...tags, cleaned]);
        }
        setTagInput('');
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className="flex flex-col gap-5 animate-fadeIn text-left">
            {/* Brand (Dropdown + Custom toggle) */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brand</label>
                    <button
                        type="button"
                        onClick={() => setCustomBrandMode(!customBrandMode)}
                        className="text-[9.5px] font-bold text-violet-600 hover:underline border-none bg-transparent cursor-pointer"
                    >
                        {customBrandMode ? 'Select from list' : '+ Custom brand'}
                    </button>
                </div>

                {!customBrandMode ? (
                    <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full h-11 px-3.5 border border-slate-200 bg-white text-slate-850 text-xs font-bold rounded-xl focus:border-slate-900 focus:outline-none cursor-pointer"
                    >
                        <option value="">Select Brand (Optional)</option>
                        {PRESET_BRANDS.map(b => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="Type brand name..."
                        className="w-full h-11 px-3.5 border border-slate-200 bg-white text-slate-850 text-xs font-bold rounded-xl focus:border-slate-900 focus:outline-none"
                    />
                )}
            </div>

            {/* Color Swatch Picker */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Color Palette</label>
                    {color && (
                        <span className="text-[9.5px] font-black text-slate-800 uppercase tracking-wider">
                            Selected: {color}
                        </span>
                    )}
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                    {PRESET_COLORS.map(c => {
                        const isSelected = color?.toLowerCase() === c.name.toLowerCase();
                        return (
                            <button
                                key={c.name}
                                type="button"
                                onClick={() => setColor(c.name)}
                                title={c.name}
                                className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                                    isSelected
                                        ? 'border-slate-900 ring-2 ring-slate-900/15 scale-110 shadow-xs'
                                        : 'border-slate-200 hover:scale-105'
                                }`}
                                style={{ backgroundColor: c.hex }}
                            >
                                {isSelected && (
                                    <Check className={`w-3.5 h-3.5 ${c.name === 'White' || c.name === 'Beige' ? 'text-slate-900' : 'text-white'}`} strokeWidth={3} />
                                )}
                            </button>
                        );
                    })}
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="Custom color..."
                        className="h-8 px-3 text-[11px] font-bold border border-slate-200 rounded-full w-28 focus:border-slate-900 focus:outline-none bg-white"
                    />
                </div>
            </div>

            {/* Material Chips */}
            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fabric / Material</label>
                <div className="flex flex-wrap gap-1.5">
                    {PRESET_MATERIALS.map(m => {
                        const isSelected = material?.toLowerCase() === m.toLowerCase();
                        return (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMaterial(isSelected ? '' : m)}
                                className={`h-8 px-3.5 rounded-xl text-[11px] font-bold transition-all border cursor-pointer ${
                                    isSelected
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                                }`}
                            >
                                {m}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Collapsible Accordion: Features & Tags */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden mt-1 bg-slate-50/40">
                <button
                    type="button"
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                    className="w-full px-4 py-3 bg-white hover:bg-slate-50/80 flex items-center justify-between text-left border-none cursor-pointer transition-colors"
                >
                    <div className="flex items-center gap-2 text-slate-850 font-black text-xs uppercase tracking-wider">
                        <Sliders className="w-4 h-4 text-violet-600" />
                        <span>Features & SEO Tags</span>
                        {(features.length > 0 || tags.length > 0) && (
                            <span className="w-2 h-2 rounded-full bg-violet-600 inline-block" />
                        )}
                    </div>
                    {showMoreInfo ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {showMoreInfo && (
                    <div className="p-4 flex flex-col gap-4 bg-white border-t border-slate-150 animate-fadeIn">
                        {/* Features Bullet List */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Key Product Features</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    placeholder="e.g. 100% Breathable Organic Cotton"
                                    className="flex-1 h-9 px-3 border border-slate-200 text-xs font-medium rounded-lg focus:border-slate-900 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddFeature}
                                    className="h-9 px-3 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-black border-none cursor-pointer flex items-center gap-1"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add
                                </button>
                            </div>

                            {features.length > 0 && (
                                <ul className="flex flex-col gap-1.5 mt-1">
                                    {features.map((feat, idx) => (
                                        <li key={idx} className="flex items-center justify-between px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-xs font-medium text-slate-700">
                                            <span>• {feat}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFeature(idx)}
                                                className="text-slate-400 hover:text-rose-600 border-none bg-transparent cursor-pointer p-0"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Tag Chips */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Search Tags</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        placeholder="Add tag and press Enter..."
                                        className="w-full h-9 pl-8 pr-3 border border-slate-200 text-xs font-medium rounded-lg focus:border-slate-900 focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="h-9 px-3 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-black border-none cursor-pointer"
                                >
                                    Add
                                </button>
                            </div>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                    {tags.map(t => (
                                        <span
                                            key={t}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 text-violet-700 border border-violet-100 text-[10px] font-bold uppercase tracking-wider rounded-md"
                                        >
                                            #{t}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(t)}
                                                className="hover:text-rose-600 border-none bg-transparent cursor-pointer p-0"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

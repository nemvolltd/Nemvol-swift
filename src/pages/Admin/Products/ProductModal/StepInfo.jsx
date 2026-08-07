import React, { useState } from 'react';
import { Image as ImageIcon, ChevronRight, Plus, Sparkles } from 'lucide-react';

export default function StepInfo({
    name, setName,
    description, setDescription,
    status, setStatus,
    category, setCategory,
    realCategories,
    onAddCategory,
    newCategoryName, setNewCategoryName,
    onOpenMediaModal,
    images, mainImage
}) {
    const [showCategorySelector, setShowCategorySelector] = useState(false);

    return (
        <div className="flex flex-col gap-5 animate-fadeIn">
            {/* Media Trigger */}
            <div className="flex flex-col gap-2 text-left">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product Media</label>
                    {images.length > 0 && (
                        <span className="text-[9.5px] font-bold text-emerald-600 uppercase tracking-wider">
                            {images.length} item{images.length > 1 ? 's' : ''} attached
                        </span>
                    )}
                </div>
                
                <div
                    onClick={onOpenMediaModal}
                    className="flex items-center justify-between p-3.5 bg-gradient-to-r from-slate-50/80 to-slate-100/40 hover:from-slate-100/80 hover:to-slate-100/70 border border-slate-200/80 rounded-2xl cursor-pointer transition-all shadow-xs group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-xs group-hover:scale-105 transition-transform">
                            <ImageIcon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-xs font-black text-slate-800">Media Gallery</span>
                            <span className="text-[10.5px] text-slate-400 font-medium">
                                {images.length > 0 ? 'Click to manage photos' : 'Browse content library or upload'}
                            </span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>

                {/* Thumbnails */}
                {images.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
                        {images.map((imgUrl, idx) => (
                            <div
                                key={idx}
                                className={`relative w-14 h-14 rounded-xl overflow-hidden border shrink-0 transition-all ${
                                    mainImage === imgUrl ? 'border-slate-900 ring-2 ring-slate-900/10 scale-95' : 'border-slate-200 hover:border-slate-400'
                                }`}
                            >
                                <img src={imgUrl} alt="thumbnail" className="w-full h-full object-cover" />
                                {mainImage === imgUrl && (
                                    <span className="absolute bottom-0.5 left-0.5 bg-slate-900 text-white text-[6.5px] font-black uppercase px-1 rounded-xs">
                                        Cover
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product Title</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Classic Silk Utility Shirt"
                    className="w-full h-11 px-3.5 border border-slate-200 bg-slate-50/30 focus:bg-white text-slate-850 text-xs font-bold rounded-xl focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-400"
                />
            </div>

            {/* Status Radio */}
            <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
                <div className="grid grid-cols-2 gap-3">
                    {['Active', 'Inactive'].map((st) => (
                        <label
                            key={st}
                            className={`flex items-center gap-2.5 px-4 py-2.5 border rounded-xl cursor-pointer transition-all ${
                                status === st
                                    ? 'border-slate-900 bg-slate-900/5 text-slate-900 font-black shadow-xs'
                                    : 'border-slate-200 bg-white text-slate-600 font-bold hover:border-slate-300'
                            }`}
                        >
                            <input
                                type="radio"
                                name="status"
                                checked={status === st}
                                onChange={() => setStatus(st)}
                                className="hidden"
                            />
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-400 flex items-center justify-center bg-white shrink-0">
                                {status === st && <span className="w-2 h-2 rounded-full bg-orange-500" />}
                            </div>
                            <span className="text-xs uppercase tracking-wide">{st}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product summary and key highlights..."
                    rows={3}
                    className="w-full p-3.5 border border-slate-200 bg-slate-50/30 focus:bg-white text-slate-850 text-xs font-medium rounded-xl focus:border-slate-900 focus:outline-none transition-all placeholder:text-slate-400 resize-none leading-relaxed"
                />
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5 text-left">
                <div className="flex items-center justify-between pb-0.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</label>
                    <button
                        type="button"
                        onClick={() => setShowCategorySelector(!showCategorySelector)}
                        className="text-[10px] font-black text-slate-900 uppercase tracking-wider hover:text-black flex items-center gap-0.5 bg-transparent border-none cursor-pointer"
                    >
                        <Plus className="w-3 h-3" />
                        <span>Add Category</span>
                    </button>
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3.5 border border-slate-200 bg-white text-slate-850 text-xs font-bold rounded-xl focus:border-slate-900 focus:outline-none cursor-pointer"
                >
                    {realCategories.map(cat => (
                        <option key={cat.id || cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                </select>

                {showCategorySelector && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex gap-2 animate-fadeIn mt-1">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="New category name"
                            className="flex-1 h-9 px-3 border border-slate-200 bg-white text-slate-850 text-xs font-bold rounded-lg focus:border-slate-900 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={(e) => { onAddCategory(e); setShowCategorySelector(false); }}
                            className="h-9 px-3.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-black border-none cursor-pointer"
                        >
                            Create
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

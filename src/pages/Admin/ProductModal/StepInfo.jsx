import React from 'react';
import { Plus } from 'lucide-react';

export default function StepInfo({
    name,
    setName,
    category,
    setCategory,
    categoriesList,
    onAddCategoryClick,
    description,
    setDescription
}) {
    return (
        <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Product Name */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vintage Denim Shirt"
                    className="h-10 px-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                    <button
                        type="button"
                        onClick={onAddCategoryClick}
                        className="text-[10px] text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wider flex items-center gap-0.5 transition-colors"
                    >
                        <Plus className="w-3 h-3" />
                        Add Category
                    </button>
                </div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-10 px-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-blue-600"
                >
                    {categoriesList.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide product details..."
                    rows={3}
                    className="p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 resize-none"
                />
            </div>
        </div>
    );
}

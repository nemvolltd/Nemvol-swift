import React from 'react';
import { Edit2, Trash2, FolderTree } from 'lucide-react';

export default function CategoryCard({ category, parentName, onEdit, onDelete }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-slate-100/60 hover:bg-slate-50/10 px-1 transition-all group select-none">
            {/* Left side: Thumbnail + Info */}
            <div className="flex items-center gap-4 flex-grow mr-4">
                
                {/* Square image box with minimal rounding */}
                <div className="w-14 h-14 bg-slate-55/40 rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden border border-slate-100/40">
                    {category.image_url || category.image ? (
                        <img
                            src={category.image_url || category.image}
                            alt={category.name}
                            className="w-full h-full object-cover object-center rounded-md"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-350 bg-slate-50 rounded-md">
                            <FolderTree className="w-5 h-5" />
                        </div>
                    )}
                </div>

                {/* Details Stack */}
                <div className="flex flex-col gap-0.5 items-start">
                    {/* Parent indicator if sub-category */}
                    {parentName && (
                        <span className="text-[9.5px] font-black uppercase text-slate-400 tracking-wider">
                            ↳ Sub of {parentName}
                        </span>
                    )}

                    {/* Category Title */}
                    <h3 className="text-xs sm:text-sm font-bold text-slate-855 leading-tight group-hover:text-black transition-colors">
                        {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-slate-400 font-semibold leading-relaxed line-clamp-1">
                        {category.description || 'Organize and group storefront inventory items.'}
                    </p>
                </div>

            </div>

            {/* Right side: Flat borderless action buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
                <button
                    onClick={() => onEdit(category)}
                    className="p-1.5 bg-transparent hover:text-slate-900 text-slate-400 transition-colors cursor-pointer border-none rounded-none"
                    title="Edit Details"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(category.id)}
                    className="p-1.5 bg-transparent hover:text-red-650 text-slate-400 transition-colors cursor-pointer border-none rounded-none"
                    title="Delete Category"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

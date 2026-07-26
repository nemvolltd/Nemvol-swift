import React from 'react';
import { X } from 'lucide-react';

export default function CategoryModal({
    isOpen,
    onClose,
    newCategoryName,
    setNewCategoryName,
    categoryError,
    onSubmit
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <form onSubmit={onSubmit} className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-5 flex flex-col gap-4 animate-scaleIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        Add New Category
                    </h4>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors"
                    >
                        <X className="w-4 h-4 text-slate-400" />
                    </button>
                </div>

                {categoryError && (
                    <div className="p-3 bg-red-50 text-red-600 text-[10px] font-bold rounded-xl border border-red-100">
                        {categoryError}
                    </div>
                )}

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category Name</label>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="e.g. Accessories"
                        className="h-10 px-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600"
                        autoFocus
                    />
                </div>

                <div className="flex items-center gap-2.5 mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10"
                    >
                        Add Category
                    </button>
                </div>
            </form>
        </div>
    );
}

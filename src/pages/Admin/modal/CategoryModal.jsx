import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, ArrowLeft } from 'lucide-react';
import mockDb from '../mockDb';

export default function CategoryModal({ isOpen, onClose, onSubmit, category, isLoading }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (isOpen) {
            setCategories(mockDb.getCategories());
        }
    }, [isOpen]);

    useEffect(() => {
        if (category) {
            setName(category.name || '');
            setDescription(category.description || '');
            setParentId(category.parent_id || '');
            setImagePreview(category.image_url || category.image || '');
        } else {
            setName('');
            setDescription('');
            setParentId('');
            setImagePreview('');
        }
    }, [category, isOpen]);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const payload = {
            name,
            description,
            parent_id: parentId || undefined,
            image: imagePreview || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop'
        };

        onSubmit(payload);
    };

    const eligibleParents = categories.filter(c => !category || c.id !== category.id);

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn select-none">
            
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Bottom-sheet Category drawer */}
            <div className="relative bg-white rounded-t-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-slideUp z-10">
                
                {/* Drag Handle Indicator */}
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
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider text-center">
                        {category ? 'Edit Category' : 'Create Category'}
                    </h3>
                    <div className="w-9" />
                </div>

                {/* Scrollable Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                    
                    {/* Category Image Uploader */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Category Thumbnail
                        </label>
                        <div className="flex items-center gap-4">
                            {imagePreview ? (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setImagePreview('')}
                                        className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors border-none"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="w-16 h-16 rounded-lg border border-dashed border-slate-200 hover:border-slate-800 bg-slate-50 hover:bg-slate-100 cursor-pointer flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                                    <Upload className="w-4 h-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                            <div className="flex flex-col gap-0.5 text-left">
                                <span className="text-xs font-bold text-slate-750">Upload Image</span>
                                <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">PNG, JPG or WEBP. Max 2MB.</span>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Category Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Footwear"
                            className="w-full h-11 px-4 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-850 focus:outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Description
                        </label>
                        <textarea
                            required
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide a brief summary of what matches this category..."
                            className="w-full p-4 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-850 focus:outline-none transition-all placeholder:text-slate-400 resize-none"
                        />
                    </div>

                    {/* Parent Category ID */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Parent Category (Optional)
                        </label>
                        <select
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                            className="w-full h-11 px-4 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-850 focus:outline-none transition-all"
                        >
                            <option value="">None (Top-Level Category)</option>
                            {eligibleParents.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Footer Actions */}
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-11 border border-slate-350 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="h-11 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center disabled:bg-slate-400 border-none"
                        >
                            {isLoading ? 'Saving...' : category ? 'Save Changes' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

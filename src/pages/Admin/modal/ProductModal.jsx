import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Image as ImageIcon, ChevronRight, Plus, Trash2, X } from 'lucide-react';
import mockDb from '../mockDb';

// Pre-seeded library of product images for the Content Library tab
const MOCK_LIBRARY_IMAGES = [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop'
];

export default function ProductModal({ isOpen, onClose, onSubmit, product, isLoading }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Active'); // Active or Inactive
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [stock, setStock] = useState('15');
    const [sizes, setSizes] = useState(['S', 'M', 'L']);

    // Media States
    const [images, setImages] = useState([]);
    const [image, setImage] = useState('');
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

    const [realCategories, setRealCategories] = useState([]);
    
    // Inline editors toggles
    const [showCategorySelector, setShowCategorySelector] = useState(false);
    
    // Add Category inline input
    const [newCategoryName, setNewCategoryName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    // Load categories
    useEffect(() => {
        if (isOpen) {
            const cats = mockDb.getCategories();
            setRealCategories(cats);
            if (cats.length > 0 && !category) {
                setCategory(cats[0].name);
            }
        }
    }, [isOpen]);

    // Populate data
    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setStatus((product.stock !== undefined ? product.stock : 15) > 0 ? 'Active' : 'Inactive');
            setCategory(product.category || '');
            setPrice(product.price ? product.price.toString() : '');
            setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
            setStock((product.stock !== undefined ? product.stock : 15).toString());
            setSizes(product.sizes || ['S', 'M', 'L']);
            setImages(product.images || (product.image ? [product.image] : []));
            setImage(product.image || '');
            setShowCategorySelector(false);
        } else {
            setName('');
            setDescription('');
            setStatus('Active');
            setCategory(realCategories[0]?.name || 'Men');
            setPrice('');
            setOriginalPrice('');
            setStock('15');
            setSizes(['S', 'M', 'L']);
            setImages([]);
            setImage('');
            setShowCategorySelector(false);
        }
        setErrorMsg('');
    }, [product, isOpen, realCategories]);

    if (!isOpen) return null;

    const handleAddCategory = (e) => {
        e.preventDefault();
        const trimmed = newCategoryName.trim();
        if (!trimmed) return;

        if (realCategories.some(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
            setErrorMsg('Category already exists.');
            return;
        }

        const newCat = mockDb.addCategory({ name: trimmed, description: `Category for ${trimmed}` });
        setRealCategories(prev => [...prev, newCat]);
        setCategory(trimmed);
        setNewCategoryName('');
        setErrorMsg('');
    };

    const handleSizeToggle = (size) => {
        setSizes(prev => 
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const handleSaveMedia = (selectedImages) => {
        setImages(selectedImages);
        if (selectedImages.length > 0) {
            setImage(selectedImages[0]);
        } else {
            setImage('');
        }
        setIsMediaModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!name.trim()) {
            setErrorMsg('Product title is required.');
            return;
        }

        if (!price || parseFloat(price) <= 0) {
            setErrorMsg('Valid product price is required.');
            return;
        }

        if (images.length === 0) {
            setErrorMsg('Please upload or select at least one media image.');
            return;
        }

        const formData = {
            name,
            description,
            category,
            price: parseFloat(price),
            originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price),
            image: image || images[0],
            images,
            stock: status === 'Active' ? (parseInt(stock) >= 0 ? parseInt(stock) : 15) : 0,
            sizes
        };

        onSubmit(formData);
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Bottom sheet content */}
            <div 
                className="relative bg-white rounded-t-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh] animate-slideUp z-10"
            >
                {/* Grab indicator line */}
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
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider text-center">
                        {product ? 'Edit Product' : 'Create Product'}
                    </h3>
                    <div className="w-9" />
                </div>

                {/* Scrollable Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    
                    {errorMsg && (
                        <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-800 text-xs font-bold rounded-xl">
                            {errorMsg}
                        </div>
                    )}

                    {/* Media trigger */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Media</label>
                        
                        <div
                            onClick={() => setIsMediaModalOpen(true)}
                            className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl cursor-pointer transition-colors"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-500">
                                    <ImageIcon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-bold text-slate-800">Add Media</span>
                                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Add media for this product</span>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>

                        {/* Selected media thumbnails */}
                        {images.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-1.5">
                                {images.map((imgUrl, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative w-16 h-16 rounded-lg overflow-hidden border ${
                                            image === imgUrl ? 'border-slate-800 ring-2 ring-slate-900/10' : 'border-slate-100'
                                        }`}
                                    >
                                        <img src={imgUrl} alt="thumbnail" className="w-full h-full object-cover" />
                                        {image === imgUrl && (
                                            <span className="absolute bottom-0.5 left-0.5 bg-slate-900 text-white text-[7px] font-black uppercase px-0.5 rounded">
                                                Main
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product Title</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product title"
                            className="w-full h-11 px-4 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-850 focus:outline-none transition-all placeholder:text-slate-455"
                        />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label
                                className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer transition-all ${
                                    status === 'Active' ? 'border-slate-800 bg-slate-50/10' : 'border-slate-100 bg-white'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    checked={status === 'Active'}
                                    onChange={() => setStatus('Active')}
                                    className="hidden"
                                />
                                <div className="w-4 h-4 rounded-full border border-slate-350 flex items-center justify-center bg-white shrink-0">
                                    {status === 'Active' && <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                                </div>
                                <span className="text-xs font-bold text-slate-850 uppercase tracking-wide">Active</span>
                            </label>
                            <label
                                className={`flex items-center gap-3 px-4 py-3 border rounded-xl cursor-pointer transition-all ${
                                    status === 'Inactive' ? 'border-slate-800 bg-slate-50/10' : 'border-slate-100 bg-white'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    checked={status === 'Inactive'}
                                    onChange={() => setStatus('Inactive')}
                                    className="hidden"
                                />
                                <div className="w-4 h-4 rounded-full border border-slate-350 flex items-center justify-center bg-white shrink-0">
                                    {status === 'Inactive' && <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                                </div>
                                <span className="text-xs font-bold text-slate-850 uppercase tracking-wide">Inactive</span>
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Descriptions</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Product description"
                            rows={3}
                            className="w-full p-4 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-850 focus:outline-none transition-all placeholder:text-slate-455 resize-none"
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between pb-1">
                            <div className="flex flex-col">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</label>
                                <span className="text-xs font-bold text-slate-850 mt-0.5">{category || 'None'}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowCategorySelector(!showCategorySelector)}
                                className="text-[10px] font-black text-slate-900 uppercase tracking-wider hover:text-black flex items-center gap-0.5 bg-transparent border-none cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                            </button>
                        </div>

                        {showCategorySelector && (
                            <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl flex flex-col gap-3 animate-slideDown">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Choose Existing</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full h-9 px-2.5 border border-slate-200 bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-850 focus:outline-none"
                                    >
                                        {realCategories.map(cat => (
                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center gap-1 my-0.5">
                                    <div className="h-px bg-slate-200/60 flex-grow" />
                                    <span className="text-[8px] text-slate-400 font-bold uppercase px-1">or Create New</span>
                                    <div className="h-px bg-slate-200/60 flex-grow" />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="Category Name"
                                        className="flex-1 h-9 px-3 border border-slate-200 bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-850 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCategory}
                                        className="h-9 px-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-black border-none cursor-pointer"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Detailed Product Info (Pricing, stock, and sizes) */}
                    <div className="border-t border-slate-100 pt-5 flex flex-col gap-4">
                        <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Inventory & Size Options</h4>
                        
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Sale Price (₦)</label>
                                <input
                                    type="number"
                                    required
                                    min="0.01"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full h-10 px-3 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-850 text-xs font-bold rounded-lg focus:border-slate-850 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Original Price (₦)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={originalPrice}
                                    onChange={(e) => setOriginalPrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full h-10 px-3 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-850 text-xs font-bold rounded-lg focus:border-slate-850 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Stock Level</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="15"
                                    className="w-full h-10 px-3 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-850 text-xs font-bold rounded-lg focus:border-slate-850 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Size selector chips */}
                        <div className="flex flex-col gap-2 mt-2">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Available Sizes</label>
                            <div className="flex flex-wrap gap-2">
                                {availableSizes.map(sz => {
                                    const active = sizes.includes(sz);
                                    return (
                                        <button
                                            key={sz}
                                            type="button"
                                            onClick={() => handleSizeToggle(sz)}
                                            className={`h-8 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                                                active 
                                                    ? 'bg-slate-900 border-slate-900 text-white' 
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                                            }`}
                                        >
                                            {sz}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
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
                            className="h-11 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center disabled:bg-slate-400"
                        >
                            {isLoading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>

                </form>
            </div>

            {/* Nested Media Library Modal */}
            <AddMediaModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onSave={handleSaveMedia}
                initialSelected={images}
            />
        </div>,
        document.body
    );
}

// ── NESTED IMAGE MEDIA LIBRARY MODAL (Matches user's exact mockup) ──
function AddMediaModal({ isOpen, onClose, onSave, initialSelected }) {
    const [activeTab, setActiveTab] = useState('library'); // 'library' or 'upload'
    const [selected, setSelected] = useState([]);
    
    const [customImages, setCustomImages] = useState([]);
    const fileRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setSelected(initialSelected || []);
        }
    }, [isOpen, initialSelected]);

    if (!isOpen) return null;

    const allAvailableImages = [...MOCK_LIBRARY_IMAGES, ...customImages];

    const handleSelectToggle = (imgUrl) => {
        setSelected(prev => 
            prev.includes(imgUrl) ? prev.filter(u => u !== imgUrl) : [...prev, imgUrl]
        );
    };

    const handleUnselectAll = () => {
        setSelected([]);
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const promises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(base64Images => {
            setCustomImages(prev => [...prev, ...base64Images]);
            // Automatically select uploaded images
            setSelected(prev => [...prev, ...base64Images]);
            setActiveTab('library'); // Switch back to see them
        });
    };

    const handleConfirm = () => {
        onSave(selected);
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-xs animate-fadeIn">
            
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative bg-white rounded-t-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[80vh] animate-slideUp z-20">
                
                {/* Grab handle indicator */}
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-2.5 shrink-0" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100">
                    <div className="w-6" /> {/* spacer */}
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider text-center">
                        Add Media
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-450 hover:text-slate-800 transition-colors border-none"
                    >
                        <X className="w-4.5 h-4.5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                    
                    {/* Tabs switcher */}
                    <div className="flex items-center gap-2 select-none">
                        <button
                            type="button"
                            onClick={() => setActiveTab('library')}
                            className={`h-9 px-4 rounded-lg text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                                activeTab === 'library'
                                    ? 'bg-[#1e192a] border-[#1e192a] text-white'
                                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                            }`}
                        >
                            Content Library
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('upload')}
                            className={`h-9 px-4 rounded-lg text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                                activeTab === 'upload'
                                    ? 'bg-[#1e192a] border-[#1e192a] text-white'
                                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                            }`}
                        >
                            Upload New
                        </button>
                    </div>

                    {activeTab === 'library' ? (
                        <div className="flex flex-col gap-3">
                            
                            {/* Selected Info Row */}
                            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                <div>
                                    <span className="text-slate-400">Selected </span>
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800">{selected.length}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleUnselectAll}
                                    className="text-slate-500 underline hover:text-black border-none bg-transparent cursor-pointer"
                                >
                                    Unselect all
                                </button>
                            </div>

                            {/* Images Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                {allAvailableImages.map((imgUrl, index) => {
                                    const isSel = selected.includes(imgUrl);
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => handleSelectToggle(imgUrl)}
                                            className={`relative aspect-square rounded-xl overflow-hidden border cursor-pointer transition-all ${
                                                isSel 
                                                    ? 'border-slate-800 ring-2 ring-slate-900/10 scale-98' 
                                                    : 'border-slate-100 bg-slate-50'
                                            }`}
                                        >
                                            <img src={imgUrl} alt="library item" className="w-full h-full object-cover" />
                                            
                                            {/* Checkbox badge top right */}
                                            <div className="absolute top-2 right-2">
                                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                                    isSel
                                                        ? 'bg-blue-600 border-blue-600 text-white'
                                                        : 'bg-white/80 border-slate-300'
                                                }`}>
                                                    {isSel && (
                                                        <svg className="w-3 h-3 fill-none stroke-current stroke-3" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    ) : (
                        <div className="py-8 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                            <ImageIcon className="w-8 h-8 text-slate-350 mb-2" />
                            <span className="text-xs font-bold text-slate-700">Browse photos to upload</span>
                            <span className="text-[10px] text-slate-400 mt-1">Select PNG, JPG, WEBP formats</span>
                            
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                ref={fileRef}
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="mt-4 h-10 px-5 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors border-none cursor-pointer"
                            >
                                Choose Files
                            </button>
                        </div>
                    )}

                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-2 gap-4 p-5 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-11 border border-slate-350 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="h-11 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}

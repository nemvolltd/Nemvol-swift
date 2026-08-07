import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Image as ImageIcon, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import mockDb from '../mockDb';
import AIProductModal from './AIProductModal';
import StepIndicator from '../Products/ProductModal/StepIndicator';
import StepInfo from '../Products/ProductModal/StepInfo';
import StepAttributes from '../Products/ProductModal/StepAttributes';
import StepPricing from '../Products/ProductModal/StepPricing';

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
    const [currentStep, setCurrentStep] = useState(1);

    // Form fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Active');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [material, setMaterial] = useState('');
    const [features, setFeatures] = useState([]);
    const [tags, setTags] = useState([]);
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [stock, setStock] = useState('15');
    const [sizes, setSizes] = useState(['S', 'M', 'L']);

    // Media
    const [images, setImages] = useState([]);
    const [image, setImage] = useState('');
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);

    const [realCategories, setRealCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (isOpen) {
            const cats = mockDb.getCategories();
            setRealCategories(cats);
            if (cats.length > 0 && !category) {
                setCategory(cats[0].name);
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setStatus((product.stock !== undefined ? product.stock : 15) > 0 ? 'Active' : 'Inactive');
            setCategory(product.category || '');
            setBrand(product.brand || '');
            setColor(product.color || '');
            setMaterial(product.material || '');
            setFeatures(product.features || []);
            setTags(product.tags || []);
            setPrice(product.price ? product.price.toString() : '');
            setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
            setStock((product.stock !== undefined ? product.stock : 15).toString());
            setSizes(product.sizes || ['S', 'M', 'L']);
            setImages(product.images || (product.image ? [product.image] : []));
            setImage(product.image || '');
        } else {
            setName('');
            setDescription('');
            setStatus('Active');
            setCategory(realCategories[0]?.name || 'Men');
            setBrand('');
            setColor('');
            setMaterial('');
            setFeatures([]);
            setTags([]);
            setPrice('');
            setOriginalPrice('');
            setStock('15');
            setSizes(['S', 'M', 'L']);
            setImages([]);
            setImage('');
        }
        setCurrentStep(1);
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

    const handleSizeToggle = (sz) => {
        setSizes(prev => prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]);
    };

    const handleSaveMedia = (selectedImages) => {
        setImages(selectedImages);
        setImage(selectedImages.length > 0 ? selectedImages[0] : '');
        setIsMediaModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!name.trim()) {
            setErrorMsg('Product title is required.');
            setCurrentStep(1);
            return;
        }
        if (!price || parseFloat(price) <= 0) {
            setErrorMsg('Valid product price is required.');
            setCurrentStep(3);
            return;
        }

        const formData = {
            name,
            description,
            category,
            brand,
            color,
            material,
            features,
            tags,
            price: parseFloat(price),
            originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price),
            image: image || images[0] || MOCK_LIBRARY_IMAGES[0],
            images: images.length > 0 ? images : [MOCK_LIBRARY_IMAGES[0]],
            stock: status === 'Active' ? (parseInt(stock) >= 0 ? parseInt(stock) : 15) : 0,
            sizes
        };

        onSubmit(formData);
    };

    const handleAIApply = (data) => {
        if (data.name) setName(data.name);
        if (data.description) setDescription(data.description);
        if (data.category) setCategory(data.category);
        if (data.price) setPrice(data.price);
        if (data.originalPrice) setOriginalPrice(data.originalPrice);
        if (data.stock) setStock(data.stock);
        if (data.sizes && data.sizes.length > 0) setSizes(data.sizes);
        
        // AI Extended fields
        if (data._aiMeta?.brand) setBrand(data._aiMeta.brand);
        if (data._aiMeta?.color) setColor(data._aiMeta.color);
        if (data._aiMeta?.material) setMaterial(data._aiMeta.material);
        if (data._aiMeta?.features?.length) setFeatures(data._aiMeta.features);
        if (data._aiMeta?.tags?.length) setTags(data._aiMeta.tags);
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative bg-white rounded-t-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-slideUp z-10">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-2.5 shrink-0" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-3 border-b border-slate-100 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-700 border-none cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider text-center">
                        {product ? 'Edit Product' : 'Create Product'}
                    </h3>
                    <button
                        type="button"
                        onClick={() => setIsAIModalOpen(true)}
                        title="Analyze image with Gemini AI"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-600 text-white shadow-sm hover:shadow-violet-300 transition-all border-none cursor-pointer shrink-0"
                    >
                        <Sparkles className="w-4 h-4" />
                    </button>
                </div>

                {/* Step indicator */}
                <StepIndicator currentStep={currentStep} onStepClick={setCurrentStep} />

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                    {errorMsg && (
                        <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 text-xs font-bold rounded-xl text-left">
                            {errorMsg}
                        </div>
                    )}

                    {currentStep === 1 && (
                        <StepInfo
                            name={name} setName={setName}
                            description={description} setDescription={setDescription}
                            status={status} setStatus={setStatus}
                            category={category} setCategory={setCategory}
                            realCategories={realCategories}
                            onAddCategory={handleAddCategory}
                            newCategoryName={newCategoryName} setNewCategoryName={setNewCategoryName}
                            onOpenMediaModal={() => setIsMediaModalOpen(true)}
                            images={images} mainImage={image}
                        />
                    )}

                    {currentStep === 2 && (
                        <StepAttributes
                            brand={brand} setBrand={setBrand}
                            color={color} setColor={setColor}
                            material={material} setMaterial={setMaterial}
                            features={features} setFeatures={setFeatures}
                            tags={tags} setTags={setTags}
                        />
                    )}

                    {currentStep === 3 && (
                        <StepPricing
                            price={price} setPrice={setPrice}
                            originalPrice={originalPrice} setOriginalPrice={setOriginalPrice}
                            stock={stock} setStock={setStock}
                            sizes={sizes} handleSizeToggle={handleSizeToggle}
                        />
                    )}

                    {/* Step Navigation Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto gap-3">
                        {currentStep > 1 ? (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(prev => prev - 1)}
                                className="h-10 px-4 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1"
                            >
                                <ChevronLeft className="w-4 h-4" /> Back
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onClose}
                                className="h-10 px-4 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                        )}

                        {currentStep < 3 ? (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                className="h-10 px-5 bg-slate-900 hover:bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1 border-none ml-auto"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="h-10 px-6 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center disabled:bg-slate-400 border-none ml-auto"
                            >
                                {isLoading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <AddMediaModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onSave={handleSaveMedia}
                initialSelected={images}
            />

            <AIProductModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                onApply={handleAIApply}
            />
        </div>,
        document.body
    );
}

// Media library nested modal
function AddMediaModal({ isOpen, onClose, onSave, initialSelected }) {
    const [activeTab, setActiveTab] = useState('library');
    const [selected, setSelected] = useState([]);
    const [customImages, setCustomImages] = useState([]);
    const fileRef = useRef(null);

    useEffect(() => {
        if (isOpen) setSelected(initialSelected || []);
    }, [isOpen, initialSelected]);

    if (!isOpen) return null;
    const allAvailableImages = [...MOCK_LIBRARY_IMAGES, ...customImages];

    const handleSelectToggle = (imgUrl) => {
        setSelected(prev => prev.includes(imgUrl) ? prev.filter(u => u !== imgUrl) : [...prev, imgUrl]);
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        const promises = files.map(file => new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        }));
        Promise.all(promises).then(base64Images => {
            setCustomImages(prev => [...prev, ...base64Images]);
            setSelected(prev => [...prev, ...base64Images]);
            setActiveTab('library');
        });
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-xs animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-t-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[80vh] animate-slideUp z-20">
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-2.5 shrink-0" />
                <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100">
                    <div className="w-6" />
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider text-center">Add Media</h3>
                    <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-450 hover:text-slate-800 border-none cursor-pointer">
                        <X className="w-4.5 h-4.5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2 select-none">
                        <button type="button" onClick={() => setActiveTab('library')} className={`h-9 px-4 rounded-lg text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${activeTab === 'library' ? 'bg-[#1e192a] border-[#1e192a] text-white' : 'bg-white border-slate-200 text-slate-500'}`}>
                            Content Library
                        </button>
                        <button type="button" onClick={() => setActiveTab('upload')} className={`h-9 px-4 rounded-lg text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${activeTab === 'upload' ? 'bg-[#1e192a] border-[#1e192a] text-white' : 'bg-white border-slate-200 text-slate-500'}`}>
                            Upload New
                        </button>
                    </div>

                    {activeTab === 'library' ? (
                        <div className="grid grid-cols-3 gap-3">
                            {allAvailableImages.map((imgUrl, index) => {
                                const isSel = selected.includes(imgUrl);
                                return (
                                    <div key={index} onClick={() => handleSelectToggle(imgUrl)} className={`relative aspect-square rounded-xl overflow-hidden border cursor-pointer transition-all ${isSel ? 'border-slate-800 ring-2 ring-slate-900/10' : 'border-slate-100 bg-slate-50'}`}>
                                        <img src={imgUrl} alt="library" className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSel ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/80 border-slate-300'}`}>
                                                {isSel && <svg className="w-3 h-3 fill-none stroke-current stroke-3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-8 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                            <ImageIcon className="w-8 h-8 text-slate-350 mb-2" />
                            <span className="text-xs font-bold text-slate-700">Browse photos to upload</span>
                            <input type="file" multiple accept="image/*" ref={fileRef} onChange={handleFileUpload} className="hidden" />
                            <button type="button" onClick={() => fileRef.current?.click()} className="mt-4 h-10 px-5 bg-slate-900 text-white text-xs font-black uppercase tracking-wider rounded-xl border-none cursor-pointer">
                                Choose Files
                            </button>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4 p-5 border-t border-slate-100">
                    <button type="button" onClick={onClose} className="h-11 border border-slate-350 bg-white text-slate-800 text-xs font-bold uppercase rounded-xl cursor-pointer">Cancel</button>
                    <button type="button" onClick={() => onSave(selected)} className="h-11 bg-orange-500 text-white text-xs font-bold uppercase rounded-xl cursor-pointer">Save</button>
                </div>
            </div>
        </div>
    );
}

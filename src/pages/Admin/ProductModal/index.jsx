import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft, ChevronRight } from 'lucide-react';
import StepIndicator from './StepIndicator';
import StepInfo from './StepInfo';
import StepPricing from './StepPricing';
import StepMedia from './StepMedia';
import CategoryModal from './CategoryModal';

export default function ProductModal({ isOpen, onClose, onSubmit, product, isLoading }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Men');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [image, setImage] = useState(''); // Main image
    const [images, setImages] = useState([]); // All images array
    const [stock, setStock] = useState('15');
    const [description, setDescription] = useState('');
    const [selectedSizes, setSelectedSizes] = useState(['S', 'M', 'L']);
    const [error, setError] = useState('');

    const [categoriesList, setCategoriesList] = useState(['Men', 'Women', 'Unisex', 'Children']);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoryError, setCategoryError] = useState('');

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

    useEffect(() => {
        if (isOpen) {
            setCurrentStep(1);
        }
        if (product) {
            setName(product.name || '');
            setCategory(product.category || 'Men');
            setPrice(product.price ? product.price.toString() : '');
            setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
            setImage(product.image || '');
            setImages(product.images || (product.image ? [product.image] : []));
            setStock(product.stock !== undefined ? product.stock.toString() : '15');
            setDescription(product.description || '');
            setSelectedSizes(product.sizes || []);

            if (product.category && !categoriesList.includes(product.category)) {
                setCategoriesList(prev => [...prev, product.category]);
            }
        } else {
            setName('');
            setCategory('Men');
            setPrice('');
            setOriginalPrice('');
            setImage('');
            setImages([]);
            setStock('15');
            setDescription('');
            setSelectedSizes(['S', 'M', 'L']);
        }
        setError('');
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const promises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(base64Images => {
            setImages(prev => {
                const updated = [...prev, ...base64Images];
                if (!image && updated.length > 0) {
                    setImage(updated[0]);
                }
                return updated;
            });
        });
    };

    const handleDeleteImage = (indexToDelete) => {
        const deletedImage = images[indexToDelete];
        const updated = images.filter((_, idx) => idx !== indexToDelete);
        setImages(updated);

        if (image === deletedImage) {
            setImage(updated.length > 0 ? updated[0] : '');
        }
    };

    const handleSizeToggle = (size) => {
        setSelectedSizes(prev => 
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const handleNextStep = () => {
        setError('');
        if (currentStep === 1) {
            if (!name.trim()) {
                setError('Product name is required.');
                return;
            }
            if (!category) {
                setError('Product category is required.');
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            if (!price || parseFloat(price) <= 0) {
                setError('Price must be greater than 0.');
                return;
            }
            setCurrentStep(3);
        }
    };

    const handlePrevStep = () => {
        setError('');
        setCurrentStep(prev => Math.max(1, prev - 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (images.length === 0) {
            setError('Please select or upload at least one image.');
            return;
        }

        if (!image) {
            setError('Please choose a main image.');
            return;
        }

        const formData = {
            name,
            category,
            price: parseFloat(price),
            originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price),
            image,
            images,
            stock: parseInt(stock) >= 0 ? parseInt(stock) : 15,
            description,
            sizes: selectedSizes
        };

        onSubmit(formData);
    };

    const handleAddCategorySubmit = (e) => {
        e.preventDefault();
        setCategoryError('');

        const trimmed = newCategoryName.trim();
        if (!trimmed) {
            setCategoryError('Category name is required.');
            return;
        }

        if (categoriesList.some(cat => cat.toLowerCase() === trimmed.toLowerCase())) {
            setCategoryError('This category already exists.');
            return;
        }

        setCategoriesList(prev => [...prev, trimmed]);
        setCategory(trimmed);
        setNewCategoryName('');
        setIsCategoryModalOpen(false);
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[75vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                <StepIndicator currentStep={currentStep} />

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-4">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}

                    {currentStep === 1 && (
                        <StepInfo
                            name={name}
                            setName={setName}
                            category={category}
                            setCategory={setCategory}
                            categoriesList={categoriesList}
                            onAddCategoryClick={() => setIsCategoryModalOpen(true)}
                            description={description}
                            setDescription={setDescription}
                        />
                    )}

                    {currentStep === 2 && (
                        <StepPricing
                            price={price}
                            setPrice={setPrice}
                            originalPrice={originalPrice}
                            setOriginalPrice={setOriginalPrice}
                            stock={stock}
                            setStock={setStock}
                        />
                    )}

                    {currentStep === 3 && (
                        <StepMedia
                            images={images}
                            image={image}
                            setImage={setImage}
                            handleImageUpload={handleImageUpload}
                            handleDeleteImage={handleDeleteImage}
                            availableSizes={availableSizes}
                            selectedSizes={selectedSizes}
                            handleSizeToggle={handleSizeToggle}
                        />
                    )}

                    {/* Footer Actions */}
                    <div className="flex items-center gap-2.5 mt-3 py-2 border-t border-slate-100">
                        {currentStep > 1 ? (
                            <button
                                key="back-btn"
                                type="button"
                                onClick={handlePrevStep}
                                className="flex-1 h-9.5 sm:h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1"
                            >
                                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                Back
                            </button>
                        ) : (
                            <button
                                key="cancel-btn"
                                type="button"
                                onClick={onClose}
                                className="flex-1 h-9.5 sm:h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                        )}

                        {currentStep < 3 ? (
                            <button
                                key="next-btn"
                                type="button"
                                onClick={handleNextStep}
                                className="flex-1 h-9.5 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-1"
                            >
                                Next
                                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                        ) : (
                            <button
                                key="submit-btn"
                                type="submit"
                                disabled={isLoading}
                                className={`flex-1 h-9.5 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center justify-center ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {isLoading ? 'Saving...' : 'Save Product'}
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => {
                    setIsCategoryModalOpen(false);
                    setCategoryError('');
                    setNewCategoryName('');
                }}
                newCategoryName={newCategoryName}
                setNewCategoryName={setNewCategoryName}
                categoryError={categoryError}
                onSubmit={handleAddCategorySubmit}
            />
        </div>,
        document.body
    );
}

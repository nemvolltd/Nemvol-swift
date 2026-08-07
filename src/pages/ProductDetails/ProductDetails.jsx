import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useProduct, useProducts } from '../../hooks/useProducts';
import { useVariants } from '../../hooks/useVariants';
import { useAddToCart } from '../../hooks/useCart';
import { useToggleWishlist, useIsWishlisted } from '../../hooks/useWishlist';
import useStore from '../../store/useStore';
import ImageGallery from './ImageGallery';
import SizeSelector from './SizeSelector';
import ProductInfo from './ProductInfo';

const ProductDetailsSkeleton = () => (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-10 py-6 animate-pulse">
        <div className="h-10 w-10 bg-slate-100 rounded-full mb-6"></div>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
            {/* Gallery Skeleton */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="aspect-[4/5] bg-slate-100 rounded-2xl w-full"></div>
                <div className="grid grid-cols-5 gap-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="aspect-square bg-slate-100 rounded-xl"></div>
                    ))}
                </div>
            </div>
            {/* Info Skeleton */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 py-4">
                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                <div className="h-8 bg-slate-100 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-slate-100 rounded w-1/3 mb-4"></div>
                <div className="h-20 bg-slate-100 rounded w-full mb-4"></div>
                <div className="h-10 bg-slate-100 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-slate-100 rounded w-full"></div>
            </div>
        </div>
    </div>
);

export default function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    // TanStack Query hooks
    const { data: products = [] } = useProducts();
    const { data: fetchedProduct, isLoading: isLoadingRemote, error: remoteError } = useProduct(id);
    const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
    const { mutate: toggleWishlist } = useToggleWishlist();
    const wishlisted = useIsWishlisted(parseInt(id));
    const setIsCartOpen = useStore((s) => s.setIsCartOpen);

    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Fetch variants
    const { data: variants = [] } = useVariants(id);

    // Track chosen variant attributes
    const [selectedAttributes, setSelectedAttributes] = useState({});

    // Prefer local cache, fall back to remote fetch
    const productsArray = Array.isArray(products) ? products : [];
    const localProduct = productsArray.find(p => p.id === parseInt(id));
    const product = localProduct || fetchedProduct;
    const isLoading = !localProduct && isLoadingRemote;

    // Find all unique attribute keys across all variants (e.g. ['color', 'size'])
    const attributeKeys = React.useMemo(() => {
        const keys = new Set();
        (variants || []).forEach(v => {
            if (v.attributes) {
                Object.keys(v.attributes).forEach(k => keys.add(k));
            }
        });
        return Array.from(keys);
    }, [variants]);

    // Group possible values for each attribute key
    const attributeValues = React.useMemo(() => {
        const groups = {};
        attributeKeys.forEach(key => {
            const vals = new Set();
            (variants || []).forEach(v => {
                if (v.attributes && v.attributes[key]) {
                    vals.add(v.attributes[key]);
                }
            });
            groups[key] = Array.from(vals);
        });
        return groups;
    }, [variants, attributeKeys]);

    // Initialize selection once values are loaded
    useEffect(() => {
        if (attributeKeys.length > 0) {
            const initial = {};
            attributeKeys.forEach(key => {
                if (attributeValues[key]?.length > 0) {
                    initial[key] = attributeValues[key][0];
                }
            });
            setSelectedAttributes(initial);
        }
    }, [variants, attributeKeys, attributeValues]);

    // Find the currently selected variant based on chosen attributes
    const selectedVariant = React.useMemo(() => {
        if (!variants || variants.length === 0) return null;
        return variants.find(v => {
            return attributeKeys.every(key => v.attributes[key] === selectedAttributes[key]);
        }) || variants[0];
    }, [variants, selectedAttributes, attributeKeys]);

    const priceToDisplay = selectedVariant ? selectedVariant.price : (product?.price || 0);

    // Update size options once product details are available
    useEffect(() => {
        if (product && product.sizes && product.sizes.length > 0) {
            setSelectedSize(product.sizes[0]);
        }
    }, [product]);

    if (isLoading) {
        return <ProductDetailsSkeleton />;
    }

    if (remoteError || !product) {
        return (
            <div className="w-full max-w-6xl mx-auto px-4 py-20 text-center">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{remoteError?.message || 'Product Not Found'}</h2>
                <button onClick={() => navigate('/products')} className="text-blue-600 font-extrabold uppercase tracking-wider text-sm mt-4">
                    Go Back To Shop
                </button>
            </div>
        );
    }

    const handleAddToCartClick = () => {
        const cartProduct = {
            ...product,
            price: priceToDisplay,
            sku: selectedVariant ? selectedVariant.sku : undefined,
            variantId: selectedVariant ? selectedVariant.id : undefined,
            attributes: selectedAttributes
        };
        addToCart({ 
            product: cartProduct, 
            size: selectedAttributes.size || selectedSize, 
            quantity 
        });
        setIsCartOpen(true);
    };

    const imagesToRender = product.images || [product.image];

    return (
        <div className="w-full max-w-6xl mx-auto bg-white min-h-screen flex flex-col pb-24 md:pb-10">
            {/* Top Bar (Mobile/Desktop) */}
            <div className="flex items-center justify-between px-4 md:px-10 py-4 md:py-6 sticky top-0 bg-white/90 backdrop-blur-md z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 border border-slate-100 transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-900" />
                </button>
                <h1 className="text-base font-bold text-slate-900">Product Details</h1>
                <button
                    onClick={() => toggleWishlist(product.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 border border-slate-100 transition-colors"
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        className={`w-5 h-5 ${wishlisted ? 'fill-blue-600 text-blue-600' : 'text-slate-900'}`}
                        strokeWidth={1.5}
                    />
                </button>
            </div>

            <div className="px-4 md:px-10 flex flex-col md:flex-row gap-8 lg:gap-16">
                {/* Left Column: Image Gallery */}
                <ImageGallery 
                    images={imagesToRender} 
                    name={product.name} 
                    activeImageIndex={activeImageIndex} 
                    setActiveImageIndex={setActiveImageIndex} 
                />

                {/* Right Column: Product Info & Size Selection */}
                <div className="w-full md:w-1/2 flex flex-col md:py-4">
                    <ProductInfo 
                        name={product.name} 
                        category={product.category} 
                        price={priceToDisplay} 
                        originalPrice={product.originalPrice} 
                        description={product.description} 
                    />

                    {attributeKeys.length > 0 ? (
                        <div className="flex flex-col gap-4 mb-6">
                            {attributeKeys.map(key => (
                                <div key={key} className="flex flex-col gap-2">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Select {key}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {attributeValues[key].map(val => {
                                            const active = selectedAttributes[key] === val;
                                            return (
                                                <button
                                                    key={val}
                                                    type="button"
                                                    onClick={() => setSelectedAttributes(prev => ({ ...prev, [key]: val }))}
                                                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                                                        active 
                                                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                                                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    {val}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <SizeSelector 
                            sizes={product.sizes} 
                            selectedSize={selectedSize} 
                            onSelectSize={setSelectedSize} 
                        />
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm font-bold text-slate-800">Quantity</span>
                        <div className="flex items-center border border-slate-200/80 rounded-xl h-11 bg-slate-50 overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="px-3.5 h-full hover:bg-slate-100 text-slate-500 font-bold transition-colors"
                            >
                                −
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-slate-800">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => setQuantity(q => q + 1)}
                                className="px-3.5 h-full hover:bg-slate-100 text-slate-500 font-bold transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button (Desktop inline, Mobile sticky) */}
                    <div className="fixed bottom-[64px] left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 md:static md:border-none md:p-0 md:bg-transparent z-40">
                        <button
                            onClick={handleAddToCartClick}
                            disabled={isAddingToCart}
                            className={`w-full h-14 md:h-16 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-bold rounded-xl md:rounded-2xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/20 ${
                                isAddingToCart ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

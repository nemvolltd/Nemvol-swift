import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
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
    const { 
        products, 
        addToCart, 
        toggleWishlist, 
        isProductWishlisted, 
        setIsCartOpen,
        getProductById,
        isLoadingCart
    } = useEcommerce();

    const [product, setProduct] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [detailsError, setDetailsError] = useState(null);

    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Fetch product details asynchronously
    useEffect(() => {
        const loadProduct = async () => {
            setLoadingDetails(true);
            setDetailsError(null);
            try {
                // Check local array first for instant lookup
                const local = products.find(p => p.id === parseInt(id));
                if (local) {
                    setProduct(local);
                } else {
                    // Fetch remote
                    const remote = await getProductById(id);
                    setProduct(remote);
                }
            } catch (err) {
                setDetailsError(err.message || 'Product not found.');
            } finally {
                setLoadingDetails(false);
            }
        };
        loadProduct();
    }, [id, products, getProductById]);

    // Update size options once product details are available
    useEffect(() => {
        if (product && product.sizes && product.sizes.length > 0) {
            setSelectedSize(product.sizes[0]);
        }
    }, [product]);

    if (loadingDetails) {
        return <ProductDetailsSkeleton />;
    }

    if (detailsError || !product) {
        return (
            <div className="w-full max-w-6xl mx-auto px-4 py-20 text-center">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{detailsError || 'Product Not Found'}</h2>
                <button onClick={() => navigate('/products')} className="text-blue-600 font-extrabold uppercase tracking-wider text-sm mt-4">
                    Go Back To Shop
                </button>
            </div>
        );
    }

    const wishlisted = isProductWishlisted(product.id);

    const handleAddToCartClick = async () => {
        await addToCart(product, selectedSize, quantity);
        setIsCartOpen(true); // Triggers global cart drawer open
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
                        price={product.price} 
                        originalPrice={product.originalPrice} 
                        description={product.description} 
                    />

                    <SizeSelector 
                        sizes={product.sizes} 
                        selectedSize={selectedSize} 
                        onSelectSize={setSelectedSize} 
                    />

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
                            disabled={isLoadingCart}
                            className={`w-full h-14 md:h-16 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-bold rounded-xl md:rounded-2xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/20 ${
                                isLoadingCart ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoadingCart ? 'Adding to Cart...' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

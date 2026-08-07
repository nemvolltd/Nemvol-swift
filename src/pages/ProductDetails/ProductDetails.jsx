import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star } from 'lucide-react';
import { useProduct, useProducts } from '../../hooks/useProducts';
import { useVariants } from '../../hooks/useVariants';
import { useAddToCart } from '../../hooks/useCart';
import { useToggleWishlist, useIsWishlisted } from '../../hooks/useWishlist';
import useStore from '../../store/useStore';

const SWATCH_SETS = [
    ['#1C1C1C', '#EA580C', '#EF4444', '#FCD34D', '#E5E7EB'],
    ['#6366F1', '#F97316', '#10B981', '#0F172A'],
    ['#0F172A', '#F8FAFC', '#D97706', '#6B7280'],
];
const getSwatches = (id) => SWATCH_SETS[(id?.toString().charCodeAt(0) || 0) % SWATCH_SETS.length];

// ── Tab content ─────────────────────────────────────────────
function DescriptionTab({ description }) {
    return (
        <p className="text-[13px] text-slate-500 leading-relaxed">
            {description || 'Lorem ipsum dolor sit amet consectetur. Placerat in semper vitae a. Blandit amet purus eget sed vitae morbi tellus. Integer ornare. Purus risus urna sed fermentum. Neque dolor tempus egestas nunc volutpat ullamcorper aliquam velit.'}
        </p>
    );
}
function SpecsTab() {
    return (
        <ul className="flex flex-col gap-2 text-[13px] text-slate-500">
            <li className="flex justify-between border-b border-slate-100 pb-2"><span className="font-medium text-slate-700">Connectivity</span><span>Bluetooth 5.3</span></li>
            <li className="flex justify-between border-b border-slate-100 pb-2"><span className="font-medium text-slate-700">Battery Life</span><span>Up to 40 hrs</span></li>
            <li className="flex justify-between border-b border-slate-100 pb-2"><span className="font-medium text-slate-700">Water Resistance</span><span>IPX5</span></li>
            <li className="flex justify-between"><span className="font-medium text-slate-700">Driver Size</span><span>10mm</span></li>
        </ul>
    );
}
function ReviewsTab() {
    return (
        <div className="flex flex-col gap-3">
            {[{ name: 'Alex M.', stars: 5, text: 'Incredible sound quality, super comfortable.' },
              { name: 'Jordan K.', stars: 4, text: 'Great value for the price. Highly recommend!' }]
            .map((r, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] font-bold text-slate-800">{r.name}</span>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, s) => (
                                <Star key={s} className={`w-3 h-3 ${s < r.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                            ))}
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-500">{r.text}</p>
                </div>
            ))}
        </div>
    );
}

// ── Skeleton ──────────────────────────────────────────────────
const Skeleton = () => (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-10 py-8 animate-pulse">
        <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2 aspect-[4/5] bg-slate-100 rounded-2xl" />
            <div className="flex-1 flex flex-col gap-4 pt-4">
                <div className="h-7 bg-slate-100 rounded w-2/3" />
                <div className="h-5 bg-slate-100 rounded w-1/3" />
                <div className="h-20 bg-slate-100 rounded" />
                <div className="h-12 bg-slate-100 rounded w-full mt-4" />
            </div>
        </div>
    </div>
);

export default function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: products = [] } = useProducts();
    const { data: fetchedProduct, isLoading: isLoadingRemote, error: remoteError } = useProduct(id);
    const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
    const { mutate: toggleWishlist } = useToggleWishlist();
    const wishlisted = useIsWishlisted(parseInt(id));
    const setIsCartOpen = useStore((s) => s.setIsCartOpen);

    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('Description');
    const [selectedColor, setSelectedColor] = useState(0);

    const { data: variants = [] } = useVariants(id);
    const [selectedAttributes, setSelectedAttributes] = useState({});

    const productsArray = Array.isArray(products) ? products : [];
    const localProduct = productsArray.find(p => p.id === parseInt(id));
    const product = localProduct || fetchedProduct;
    const isLoading = !localProduct && isLoadingRemote;

    const attributeKeys = React.useMemo(() => {
        const keys = new Set();
        (variants || []).forEach(v => v.attributes && Object.keys(v.attributes).forEach(k => keys.add(k)));
        return Array.from(keys);
    }, [variants]);

    const attributeValues = React.useMemo(() => {
        const groups = {};
        attributeKeys.forEach(key => {
            const vals = new Set();
            (variants || []).forEach(v => v.attributes?.[key] && vals.add(v.attributes[key]));
            groups[key] = Array.from(vals);
        });
        return groups;
    }, [variants, attributeKeys]);

    useEffect(() => {
        if (attributeKeys.length > 0) {
            const initial = {};
            attributeKeys.forEach(key => {
                if (attributeValues[key]?.length > 0) initial[key] = attributeValues[key][0];
            });
            setSelectedAttributes(initial);
        }
    }, [variants, attributeKeys, attributeValues]);

    const selectedVariant = React.useMemo(() => {
        if (!variants?.length) return null;
        return variants.find(v => attributeKeys.every(k => v.attributes[k] === selectedAttributes[k])) || variants[0];
    }, [variants, selectedAttributes, attributeKeys]);

    const priceToDisplay = selectedVariant ? selectedVariant.price : (product?.price || 0);
    const swatches = getSwatches(product?.id);
    const imagesToRender = product?.images?.length > 0 ? product.images : [product?.image];
    const tabs = ['Description', 'Specifications', 'Reviews'];

    useEffect(() => {
        if (product?.sizes?.length > 0) setSelectedSize(product.sizes[0]);
    }, [product]);

    if (isLoading) return <Skeleton />;
    if (remoteError || !product) {
        return (
            <div className="w-full max-w-6xl mx-auto px-5 py-20 text-center">
                <h2 className="text-xl font-bold text-slate-900 mb-3">{remoteError?.message || 'Product Not Found'}</h2>
                <button onClick={() => navigate('/products')} className="text-orange-500 font-bold text-sm">← Back to Shop</button>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            product: { ...product, price: priceToDisplay, variantId: selectedVariant?.id, attributes: selectedAttributes },
            size: selectedAttributes.size || selectedSize,
            quantity,
        });
        setIsCartOpen(true);
    };

    return (
        <div className="w-full bg-white min-h-screen pb-28 md:pb-12">
            <div className="max-w-6xl mx-auto md:px-10">

                {/* ── Desktop top bar ── */}
                <div className="hidden md:flex items-center justify-between py-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium border-none bg-transparent cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                            className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center cursor-pointer bg-white"
                        >
                            <Share2 className="w-4 h-4 text-slate-500" />
                        </button>
                        <button
                            onClick={() => toggleWishlist(product.id)}
                            className="w-9 h-9 rounded-full border border-slate-200 hover:bg-orange-50 flex items-center justify-center cursor-pointer bg-white"
                        >
                            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-orange-500 text-orange-500' : 'text-slate-500'}`} strokeWidth={1.8} />
                        </button>
                    </div>
                </div>

                {/* ── Two-column layout on desktop / stacked on mobile ── */}
                <div className="flex flex-col md:flex-row gap-8 lg:gap-14">

                    {/* ── Left: Image ── */}
                    <div className="w-full md:w-[48%] relative">
                        {/* Mobile floating header */}
                        <div className="md:hidden absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                            <button
                                onClick={() => navigate(-1)}
                                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border-none cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4 text-slate-800" />
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border-none cursor-pointer"
                                >
                                    <Share2 className="w-4 h-4 text-slate-700" />
                                </button>
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border-none cursor-pointer"
                                >
                                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-orange-500 text-orange-500' : 'text-slate-700'}`} strokeWidth={1.8} />
                                </button>
                            </div>
                        </div>

                        {/* Main image */}
                        <div className="relative w-full aspect-square md:aspect-[4/5] bg-slate-100 rounded-none md:rounded-2xl overflow-hidden">
                            <img
                                src={imagesToRender[activeImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Dots */}
                            {imagesToRender.length > 1 && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {imagesToRender.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImageIndex(i)}
                                            className={`rounded-full border-none cursor-pointer p-0 transition-all ${i === activeImageIndex ? 'w-4 h-1.5 bg-orange-500' : 'w-1.5 h-1.5 bg-white/60'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Thumbnails (desktop only) */}
                        {imagesToRender.length > 1 && (
                            <div className="hidden md:flex gap-2.5 mt-3 flex-wrap">
                                {imagesToRender.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImageIndex(i)}
                                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                            activeImageIndex === i ? 'border-orange-400' : 'border-slate-200 opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Info ── */}
                    <div className="flex-1 flex flex-col px-4 md:px-0 pt-5 md:pt-0 md:py-2">

                        {/* Name + price */}
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-1">{product.name}</h1>
                        <span className="text-2xl md:text-3xl font-black text-slate-900 mb-3">${priceToDisplay.toFixed(2)}</span>

                        {/* Rating + seller */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-200 text-amber-200'}`} />
                                    ))}
                                </div>
                                <span className="text-[11px] text-slate-500 font-medium">(320 Review)</span>
                            </div>
                            <span className="text-[11px] text-slate-400">Seller: <span className="text-slate-700 font-semibold">Tariqul Islam</span></span>
                        </div>

                        {/* Color swatches */}
                        <div className="mb-5">
                            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2.5 block">Color</span>
                            <div className="flex gap-3">
                                {swatches.map((color, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedColor(i)}
                                        style={{ backgroundColor: color }}
                                        className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all ${selectedColor === i ? 'border-orange-500 scale-110 shadow-md' : 'border-white shadow-sm hover:scale-105'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        {product.sizes?.length > 0 && (
                            <div className="mb-5">
                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2.5 block">Size</span>
                                <div className="flex gap-2 flex-wrap">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold border cursor-pointer transition-all ${
                                                selectedSize === size
                                                    ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Variant attributes */}
                        {attributeKeys.filter(k => k !== 'size').map(key => (
                            <div key={key} className="mb-4">
                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 block">{key}</span>
                                <div className="flex gap-2 flex-wrap">
                                    {attributeValues[key].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setSelectedAttributes(prev => ({ ...prev, [key]: val }))}
                                            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold border cursor-pointer transition-all ${
                                                selectedAttributes[key] === val
                                                    ? 'bg-orange-500 border-orange-500 text-white'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300'
                                            }`}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Tabs */}
                        <div className="flex items-center gap-1 border-b border-slate-100 mb-4 overflow-x-auto hide-scrollbar">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-[12px] font-semibold pb-2.5 px-4 border-none bg-transparent cursor-pointer transition-all ${
                                        activeTab === tab
                                            ? 'text-orange-500 border-b-2 border-orange-500'
                                            : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="mb-6">
                            {activeTab === 'Description' && <DescriptionTab description={product.description} />}
                            {activeTab === 'Specifications' && <SpecsTab />}
                            {activeTab === 'Reviews' && <ReviewsTab />}
                        </div>

                        {/* Desktop quantity + Add to cart */}
                        <div className="hidden md:flex items-center gap-4 mt-auto">
                            <div className="flex items-center bg-slate-100 rounded-full overflow-hidden h-12">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-11 h-12 flex items-center justify-center text-slate-600 text-lg font-light hover:bg-slate-200 transition-colors border-none cursor-pointer bg-transparent"
                                >−</button>
                                <span className="w-8 text-center text-[13px] font-bold text-slate-800">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="w-11 h-12 flex items-center justify-center text-slate-600 text-lg font-light hover:bg-slate-200 transition-colors border-none cursor-pointer bg-transparent"
                                >+</button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-full transition-all border-none cursor-pointer shadow-[0_4px_16px_rgba(249,115,22,0.30)] disabled:opacity-60"
                            >
                                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mobile sticky bottom bar ── */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-5 pt-3 pb-5 flex items-center gap-3 z-50">
                <div className="flex items-center bg-slate-100 rounded-full overflow-hidden h-12 shrink-0">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-12 flex items-center justify-center text-slate-600 text-lg hover:bg-slate-200 transition-colors border-none cursor-pointer bg-transparent">−</button>
                    <span className="w-8 text-center text-[13px] font-bold text-slate-800">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-12 flex items-center justify-center text-slate-600 text-lg hover:bg-slate-200 transition-colors border-none cursor-pointer bg-transparent">+</button>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-full transition-all border-none cursor-pointer shadow-[0_4px_16px_rgba(249,115,22,0.30)] disabled:opacity-60"
                >
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}

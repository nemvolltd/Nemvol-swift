import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
    {
        title: 'Super Sale\nDiscount',
        subtitle: 'Up to 50% Off Everything',
        cta: 'Shop Now',
        bg: 'from-orange-500 to-amber-400',
        textColor: 'text-white',
        subtitleColor: 'text-white/90',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    },
    {
        title: 'New Autumn\nArrivals',
        subtitle: 'Fresh curated styles',
        cta: 'Explore Style',
        bg: 'from-indigo-600 to-purple-400',
        textColor: 'text-white',
        subtitleColor: 'text-white/80',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    },
    {
        title: 'Flash Sale\nDeals',
        subtitle: 'Limited time boutique offers',
        cta: 'Grab Offers',
        bg: 'from-slate-900 to-slate-700',
        textColor: 'text-white',
        subtitleColor: 'text-slate-350',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600',
    },
];

export default function HeroBanner() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slide = SLIDES[current];

    return (
        <div className="w-full mb-8 relative select-none">
            <div className={`relative w-full bg-gradient-to-r ${slide.bg} rounded-3xl overflow-hidden h-[178px] sm:h-[240px] md:h-[300px] lg:h-[340px] flex items-center transition-all duration-700 shadow-md`}>
                
                {/* Decorative background glow elements */}
                <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

                {/* Left/Text Column */}
                <div className="relative z-10 w-[55%] md:w-[50%] pl-6 sm:pl-10 md:pl-16 pr-2 flex flex-col justify-center gap-1.5 md:gap-3">
                    <span className="text-[9px] sm:text-[10px] md:text-xs font-black tracking-widest uppercase bg-white/20 text-white self-start px-2.5 py-1 rounded-full backdrop-blur-sm">
                        Nemvol Exclusive
                    </span>
                    <h2 className={`${slide.textColor} text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight whitespace-pre-line tracking-tight`}>
                        {slide.title}
                    </h2>
                    <p className={`${slide.subtitleColor} text-[11px] sm:text-sm md:text-base font-semibold tracking-wide`}>
                        {slide.subtitle}
                    </p>
                    <button onClick={() => navigate('/products')} className="mt-1.5 md:mt-3 self-start bg-white hover:bg-slate-50 text-slate-900 text-[10px] sm:text-xs font-bold px-4 py-2 sm:px-6 sm:py-2.5 rounded-full transition-all shadow-sm hover:scale-105 active:scale-95 duration-200 border-none cursor-pointer">
                        {slide.cta}
                    </button>
                </div>

                {/* Right/Image Column with fading mask */}
                <div className="absolute right-0 top-0 bottom-0 h-full w-[45%] md:w-[50%] overflow-hidden flex justify-end items-end pointer-events-none">
                    {/* Radial gradient mask overlay to blend image nicely */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 z-10" />
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover object-center opacity-95 transition-all duration-700 hover:scale-105"
                    />
                </div>

                {/* Pagination Indicators (bottom left / centered on mobile) */}
                <div className="absolute bottom-4 left-6 sm:left-10 md:left-16 flex gap-2 z-10">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`rounded-full transition-all border-none cursor-pointer p-0 ${
                                i === current
                                    ? 'w-6 h-1.5 bg-white'
                                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

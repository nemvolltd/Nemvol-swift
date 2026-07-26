import React from 'react';

export default function HeroBanner() {
    return (
        <div className="relative w-full bg-[#9ca3af] rounded-xl overflow-hidden mb-8 h-[200px] md:h-[300px] flex items-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative z-10 w-1/2 pl-6 md:pl-12">
                <h2 className="text-white text-2xl md:text-4xl font-black leading-tight mb-1">
                    Flash Sale<br />Bonus
                </h2>
                <p className="text-blue-100 text-sm md:text-lg font-semibold mb-4">
                    Up to 90%
                </p>
                <button className="bg-blue-600 text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded hover:bg-blue-700 transition-colors">
                    Shop Now
                </button>
            </div>

            {/* Hero Image */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full flex justify-end items-end">
                <img
                    src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800"
                    alt="Summer Collection"
                    className="h-[120%] object-cover object-top mix-blend-luminosity opacity-90"
                />
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
            </div>
        </div>
    );
}

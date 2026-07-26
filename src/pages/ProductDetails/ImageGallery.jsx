import React from 'react';

export default function ImageGallery({ images, name, activeImageIndex, setActiveImageIndex }) {
    if (!images || images.length === 0) return null;

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-1/2">
            {/* Thumbnails Column (Left on desktop, bottom on mobile) */}
            <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto hide-scrollbar pb-1 md:pb-0 md:max-h-[500px]">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === idx 
                            ? 'border-blue-600 scale-95 shadow-sm' 
                            : 'border-transparent opacity-75 hover:opacity-100 hover:scale-98'
                        }`}
                    >
                        <img 
                            src={img} 
                            alt={`${name} view ${idx}`} 
                            className="w-full h-full object-cover" 
                        />
                    </button>
                ))}
            </div>

            {/* Main Preview Image */}
            <div className="relative w-full aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden shadow-sm group">
                <img
                    src={images[activeImageIndex]}
                    alt={name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Pagination Dots (Mobile Overlay indicator) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden bg-slate-900/10 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeImageIndex === idx ? 'bg-white' : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

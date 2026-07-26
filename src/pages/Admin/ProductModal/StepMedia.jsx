import React from 'react';
import { Upload, Trash2, CheckCircle2 } from 'lucide-react';

export default function StepMedia({
    images,
    image,
    setImage,
    handleImageUpload,
    handleDeleteImage,
    availableSizes,
    selectedSizes,
    handleSizeToggle
}) {
    return (
        <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Image Upload */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Product Images</label>
                <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-3 text-center cursor-pointer transition-colors relative">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5">
                        <Upload className="w-5 h-5 text-slate-400" />
                        <p className="text-xs text-slate-600 font-bold">Upload image files</p>
                        <p className="text-[9px] text-slate-400 font-medium">Select multiple, tap preview to set as Main image.</p>
                    </div>
                </div>

                {/* Thumbnail Grid */}
                {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-1">
                        {images.map((imgSrc, idx) => {
                            const isMain = imgSrc === image;
                            return (
                                <div 
                                    key={idx} 
                                    onClick={() => setImage(imgSrc)}
                                    className={`relative group rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-square bg-slate-50 flex items-center justify-center ${
                                        isMain ? 'border-blue-600 ring-2 ring-blue-50' : 'border-slate-100 hover:border-slate-300'
                                    }`}
                                >
                                    <img
                                        src={imgSrc}
                                        alt={`Upload preview ${idx}`}
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    {isMain && (
                                        <div className="absolute top-1 left-1 bg-blue-600 text-white rounded px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider flex items-center gap-0.5 shadow-sm">
                                            <CheckCircle2 className="w-2 h-2" />
                                            Main
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteImage(idx);
                                        }}
                                        className="absolute top-1 right-1 w-5 h-5 rounded bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all shadow-sm"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Sizes Selection */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Available Sizes</label>
                <div className="flex flex-wrap gap-1.5">
                    {availableSizes.map(size => {
                        const selected = selectedSizes.includes(size);
                        return (
                            <button
                                type="button"
                                key={size}
                                onClick={() => handleSizeToggle(size)}
                                className={`px-3 py-1.5 text-[10px] font-bold rounded-xl border transition-all ${
                                    selected 
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

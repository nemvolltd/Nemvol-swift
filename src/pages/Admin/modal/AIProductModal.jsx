import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
    ArrowLeft, Sparkles, Upload, Image as ImageIcon,
    Wand2, RotateCcw, Check, Loader2, AlertCircle, X
} from 'lucide-react';

// ── Gemini API ────────────────────────────────────────────────────────────────
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

const SYSTEM_PROMPT = `Analyze this product image. Return ONLY a raw JSON object — no markdown, no code fences, no extra text.

{
  "name": "",
  "description": "",
  "category": "",
  "brand": "",
  "color": "",
  "material": "",
  "price": "",
  "features": [],
  "tags": [],
  "sizes": [],
  "stock": "15"
}

Rules:
- name: short product title (max 5 words)
- description: 2-sentence professional product description
- category: one of [Men, Women, Footwear, Accessories, Kids]
- price: suggested retail price in NGN as a number string (e.g. "25000")
- sizes: relevant sizes array (e.g. ["S","M","L","XL"] or ["39","40","41","42"] for footwear, or ["One Size"])
- stock: default "15"
- features: 3 to 5 key product features as short strings
- tags: 4 to 6 SEO tags as lowercase strings
- Return ONLY the JSON, nothing else.`;

async function analyzeImageWithGemini(base64Data, mimeType) {
    if (!GEMINI_KEY || GEMINI_KEY === 'your_gemini_api_key_here') {
        throw new Error('NO_API_KEY');
    }

    const body = {
        contents: [{
            parts: [
                { text: SYSTEM_PROMPT },
                {
                    inline_data: {
                        mime_type: mimeType,
                        data: base64Data
                    }
                }
            ]
        }]
    };

    const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Strip markdown code fences if the model wraps it anyway
    const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
}

// ── AI Product Modal ──────────────────────────────────────────────────────────
export default function AIProductModal({ isOpen, onClose, onApply }) {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageMime, setImageMime] = useState('image/jpeg');
    const [imageBase64, setImageBase64] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [generated, setGenerated] = useState(null);
    const [error, setError] = useState('');
    const [appliedSuccess, setAppliedSuccess] = useState(false);

    const fileRef = useRef(null);

    const reset = () => {
        setImageFile(null);
        setImagePreview(null);
        setImageBase64('');
        setImageMime('image/jpeg');
        setGenerated(null);
        setError('');
        setAppliedSuccess(false);
        setIsDragging(false);
    };

    const handleClose = () => { reset(); onClose(); };

    // Convert file → base64 + preview URL
    const loadFile = (file) => {
        if (!file || !file.type.startsWith('image/')) {
            setError('Please upload a valid image file (JPG, PNG, WEBP).');
            return;
        }
        setError('');
        setGenerated(null);
        setImageFile(file);
        setImageMime(file.type);

        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            setImagePreview(dataUrl);
            // Strip the data:image/...;base64, prefix for Gemini
            setImageBase64(dataUrl.split(',')[1]);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e) => loadFile(e.target.files?.[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        loadFile(e.dataTransfer.files?.[0]);
    };

    const handleAnalyze = async () => {
        if (!imageBase64) {
            setError('Please upload a product image first.');
            return;
        }
        setError('');
        setGenerated(null);
        setIsAnalyzing(true);
        try {
            const result = await analyzeImageWithGemini(imageBase64, imageMime);
            setGenerated(result);
        } catch (e) {
            if (e.message === 'NO_API_KEY') {
                setError('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.');
            } else {
                setError(`Analysis failed: ${e.message}`);
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleApply = () => {
        if (!generated) return;
        onApply({
            name: generated.name || '',
            description: generated.description || '',
            category: generated.category || 'Men',
            price: generated.price || '',
            originalPrice: generated.price ? String(Math.round(parseFloat(generated.price) * 1.25)) : '',
            stock: generated.stock || '15',
            sizes: generated.sizes?.length ? generated.sizes : ['S', 'M', 'L'],
            // Also pass through extra metadata for potential future use
            _aiMeta: {
                brand: generated.brand,
                color: generated.color,
                material: generated.material,
                features: generated.features,
                tags: generated.tags,
            }
        });
        setAppliedSuccess(true);
        setTimeout(() => {
            reset();
            onClose();
        }, 900);
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-end justify-center bg-slate-950/70 backdrop-blur-sm animate-fadeIn select-none">
            
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={handleClose} />

            {/* Bottom-sheet */}
            <div className="relative bg-white rounded-t-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[92vh] animate-slideUp z-10 overflow-hidden">
                
                {/* Grab handle */}
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-2.5 shrink-0" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100 shrink-0">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-700 transition-colors border-none cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shrink-0">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                            Analyze Product Image
                        </h3>
                    </div>
                    <div className="w-9" />
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                    {/* Error banner */}
                    {error && (
                        <div className="flex items-start gap-2.5 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold rounded-xl">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Image Upload Zone */}
                    {!imagePreview ? (
                        <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileRef.current?.click()}
                            className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all ${
                                isDragging
                                    ? 'border-violet-400 bg-violet-50/50 scale-[1.01]'
                                    : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50/40 bg-slate-50/20'
                            }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                                isDragging ? 'bg-violet-100 text-violet-600' : 'bg-white border border-slate-100 text-slate-400 shadow-sm'
                            }`}>
                                <Upload className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <p className="text-sm font-black text-slate-800">
                                    {isDragging ? 'Drop your image here' : 'Upload a product photo'}
                                </p>
                                <p className="text-[11px] text-slate-400 font-semibold">
                                    Drag & drop, or click to browse · JPG, PNG, WEBP
                                </p>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-violet-500">
                                AI will extract all product details automatically
                            </span>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleFileInput}
                            />
                        </div>
                    ) : (
                        /* Image preview */
                        <div className="flex flex-col gap-3">
                            <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                                <img
                                    src={imagePreview}
                                    alt="Product to analyze"
                                    className="w-full max-h-64 object-contain"
                                />
                                {/* Remove image button */}
                                {!isAnalyzing && !generated && (
                                    <button
                                        type="button"
                                        onClick={() => { setImagePreview(null); setImageBase64(''); setImageFile(null); setError(''); }}
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border-none cursor-pointer transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                {/* Analyzing overlay */}
                                {isAnalyzing && (
                                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg">
                                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                                        </div>
                                        <p className="text-white text-xs font-black uppercase tracking-wider">Reading image with Gemini...</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
                                {imageFile?.name} · {(imageFile?.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                    )}

                    {/* Generated results */}
                    {generated && !isAnalyzing && (
                        <div className="flex flex-col gap-4 animate-fadeIn">

                            {/* Section label */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-violet-700">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span className="text-[9.5px] font-black uppercase tracking-wider">AI Detected Details</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { setGenerated(null); }}
                                    className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-[9.5px] font-bold uppercase tracking-wider border-none bg-transparent cursor-pointer transition-colors"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    Re-analyze
                                </button>
                            </div>

                            {/* Core fields grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                {[
                                    { label: 'Product Name', value: generated.name },
                                    { label: 'Category', value: generated.category },
                                    { label: 'Brand', value: generated.brand || '—' },
                                    { label: 'Color', value: generated.color || '—' },
                                    { label: 'Material', value: generated.material || '—' },
                                    { label: 'Suggested Price (₦)', value: generated.price ? `₦${parseFloat(generated.price).toLocaleString()}` : '—' },
                                    { label: 'Stock', value: `${generated.stock || 15} units` },
                                    { label: 'Sizes', value: generated.sizes?.join(', ') || '—' },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex flex-col gap-0.5 bg-slate-50/60 border border-slate-100 rounded-xl px-3 py-2.5 text-left">
                                        <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
                                        <span className="text-xs text-slate-800 font-black truncate">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="bg-white border border-slate-100 rounded-xl px-4 py-3 text-left">
                                <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Description</span>
                                <p className="text-[11.5px] text-slate-700 font-semibold leading-relaxed">{generated.description}</p>
                            </div>

                            {/* Features */}
                            {generated.features?.length > 0 && (
                                <div className="bg-white border border-slate-100 rounded-xl px-4 py-3 text-left">
                                    <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Key Features</span>
                                    <ul className="flex flex-col gap-1.5">
                                        {generated.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2 text-[11px] text-slate-700 font-semibold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Tags */}
                            {generated.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {generated.tags.map((tag, i) => (
                                        <span key={i} className="px-2.5 py-1 text-[9.5px] font-bold text-violet-700 bg-violet-50 border border-violet-100 rounded-full uppercase tracking-wider">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <p className="text-[10px] text-slate-400 font-semibold text-center">
                                These values will pre-fill the product form. You can still edit before saving.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 shrink-0">
                    {!generated ? (
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="h-11 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !imageBase64}
                                className="h-11 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border-none disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-violet-200"
                            >
                                {isAnalyzing ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                                ) : (
                                    <><Wand2 className="w-4 h-4" /> Analyze with AI</>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setGenerated(null)}
                                className="h-11 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Re-analyze
                            </button>
                            <button
                                type="button"
                                onClick={handleApply}
                                className={`h-11 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border-none shadow-lg ${
                                    appliedSuccess
                                        ? 'bg-emerald-500 shadow-emerald-200'
                                        : 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-violet-200'
                                }`}
                            >
                                {appliedSuccess ? (
                                    <><Check className="w-4 h-4" /> Applied!</>
                                ) : (
                                    <><Sparkles className="w-4 h-4" /> Apply to Form</>
                                )}
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>,
        document.body
    );
}

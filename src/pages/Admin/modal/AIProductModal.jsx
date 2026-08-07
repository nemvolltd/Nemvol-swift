import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, ArrowLeft, Wand2, RotateCcw, Check, Loader2, AlertCircle } from 'lucide-react';

// ── Simulated AI Product Generator ──────────────────────────────────────────
// Parses the prompt and intelligently auto-fills product fields.
// In production replace this with a real AI API call (e.g. Gemini / GPT-4o).
function simulateAIGeneration(prompt) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const p = prompt.toLowerCase();

            // Heuristic name extraction
            let name = '';
            let description = '';
            let category = 'Men';
            let price = '';
            let originalPrice = '';
            let stock = '15';
            let sizes = ['S', 'M', 'L'];

            // Category detection
            if (p.includes('jacket') || p.includes('blazer') || p.includes('coat')) category = 'Men';
            if (p.includes('dress') || p.includes('skirt') || p.includes('blouse')) category = 'Women';
            if (p.includes('sneaker') || p.includes('boot') || p.includes('shoe')) category = 'Footwear';
            if (p.includes('bag') || p.includes('handbag') || p.includes('purse')) category = 'Accessories';
            if (p.includes('cap') || p.includes('hat') || p.includes('belt')) category = 'Accessories';

            // Price extraction (look for numbers near currency words)
            const priceMatch = p.match(/(?:₦|ngn|naira|price|cost|sell|for)\s*[\$]?\s*([0-9,]+(?:\.[0-9]+)?)/);
            if (priceMatch) {
                price = priceMatch[1].replace(/,/g, '');
            } else {
                // Guess based on category
                const priceMap = { 'Men': '25000', 'Women': '22000', 'Footwear': '35000', 'Accessories': '12000' };
                price = priceMap[category] || '20000';
            }
            originalPrice = (parseFloat(price) * 1.25).toFixed(0);

            // Sizes based on product type
            if (p.includes('shoe') || p.includes('sneaker') || p.includes('boot')) {
                sizes = ['39', '40', '41', '42', '43', '44'];
            } else if (p.includes('cap') || p.includes('hat') || p.includes('bag') || p.includes('watch')) {
                sizes = ['One Size'];
            } else {
                sizes = ['XS', 'S', 'M', 'L', 'XL'];
            }

            // Build title from prompt (capitalize first meaningful words)
            const stopWords = new Set(['a', 'an', 'the', 'with', 'and', 'or', 'for', 'in', 'at', 'to', 'of', 'on', 'its', 'is', 'this', 'has']);
            const words = prompt.replace(/[₦,\.!?]/g, '').split(/\s+/).filter(w => !stopWords.has(w.toLowerCase()) && w.length > 2);
            name = words.slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            if (!name) name = 'New Product';

            // Build a professional description
            description = `${name} is a premium fashion piece crafted with attention to detail and quality. ${
                p.includes('cotton') ? 'Made from 100% breathable cotton. ' : ''
            }${
                p.includes('leather') ? 'Genuine leather construction for lasting durability. ' : ''
            }${
                p.includes('linen') ? 'High-quality linen fabric perfect for all seasons. ' : ''
            }Perfect for both casual and formal occasions. Available in multiple sizes.`;

            // Stock heuristics
            if (p.includes('limited') || p.includes('exclusive') || p.includes('rare')) stock = '5';
            else if (p.includes('bulk') || p.includes('wholesale') || p.includes('abundant')) stock = '100';

            resolve({ name, description, category, price, originalPrice, stock, sizes });
        }, 2200);
    });
}

// ── AI Product Modal ─────────────────────────────────────────────────────────
export default function AIProductModal({ isOpen, onClose, onApply }) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generated, setGenerated] = useState(null);
    const [error, setError] = useState('');
    const [appliedSuccess, setAppliedSuccess] = useState(false);

    const suggestions = [
        'Premium leather jacket for men, price ₦45000, limited stock',
        'Floral summer dress for women in cotton, comfortable and light',
        'Classic white linen blazer with modern fit, size S to XXL',
        'Luxury sneakers for men, sizes 40 to 44, price ₦65000',
    ];

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please describe your product first.');
            return;
        }
        setError('');
        setGenerated(null);
        setIsGenerating(true);
        try {
            const result = await simulateAIGeneration(prompt);
            setGenerated(result);
        } catch (e) {
            setError('Generation failed. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleApply = () => {
        if (!generated) return;
        onApply(generated);
        setAppliedSuccess(true);
        setTimeout(() => {
            setAppliedSuccess(false);
            setGenerated(null);
            setPrompt('');
            onClose();
        }, 1000);
    };

    const handleReset = () => {
        setGenerated(null);
        setPrompt('');
        setError('');
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[120] flex items-end justify-center bg-slate-950/70 backdrop-blur-sm animate-fadeIn select-none">
            
            {/* Backdrop click */}
            <div className="absolute inset-0" onClick={handleClose} />

            {/* Bottom-sheet */}
            <div className="relative bg-white rounded-t-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh] animate-slideUp z-10">
                
                {/* Grab handle */}
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto my-2.5 shrink-0" />

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-4 border-b border-slate-100">
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
                            AI Product Generator
                        </h3>
                    </div>
                    <div className="w-9" />
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    
                    {/* Intro text */}
                    <div className="flex flex-col gap-1 text-left">
                        <p className="text-xs font-bold text-slate-800">Describe your product in plain language.</p>
                        <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                            The AI will extract the title, description, price, category, stock level, and sizes automatically.
                        </p>
                    </div>

                    {/* Prompt input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider text-left">Your Description</label>
                        <textarea
                            value={prompt}
                            onChange={(e) => { setPrompt(e.target.value); setError(''); }}
                            placeholder="e.g. A premium Nigerian senator fabric blazer for men in navy blue. Cotton-rich blend, price ₦38000, limited stock of 10 units."
                            rows={4}
                            className="w-full p-4 border border-slate-200 bg-slate-50/30 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-700 focus:outline-none transition-all resize-none leading-relaxed"
                        />

                        {error && (
                            <div className="flex items-center gap-2 text-rose-700 text-xs font-bold mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Quick-fill suggestions */}
                    {!generated && !isGenerating && (
                        <div className="flex flex-col gap-2 text-left">
                            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Suggestions</span>
                            <div className="flex flex-col gap-2">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setPrompt(s)}
                                        className="w-full text-left px-3.5 py-2.5 text-[11px] font-bold text-slate-700 bg-slate-50/60 border border-slate-100 rounded-xl hover:border-slate-300 hover:bg-white transition-all cursor-pointer"
                                    >
                                        &ldquo;{s}&rdquo;
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Loading state */}
                    {isGenerating && (
                        <div className="flex flex-col items-center justify-center py-10 gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-200">
                                <Loader2 className="w-5 h-5 text-white animate-spin" />
                            </div>
                            <p className="text-xs font-black text-slate-700 uppercase tracking-wider">Generating product...</p>
                            <p className="text-[10px] text-slate-400 font-semibold">Reading your description & filling fields</p>
                        </div>
                    )}

                    {/* Generated preview */}
                    {generated && !isGenerating && (
                        <div className="flex flex-col gap-4 p-4 border border-violet-100 bg-violet-50/30 rounded-2xl animate-fadeIn">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-violet-700">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span className="text-[9.5px] font-black uppercase tracking-wider">Generated Output</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-[9.5px] font-bold uppercase tracking-wider border-none bg-transparent cursor-pointer transition-colors"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    Retry
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { label: 'Product Title', value: generated.name },
                                    { label: 'Category', value: generated.category },
                                    { label: 'Sale Price (₦)', value: `₦${parseFloat(generated.price).toLocaleString()}` },
                                    { label: 'Original Price (₦)', value: `₦${parseFloat(generated.originalPrice).toLocaleString()}` },
                                    { label: 'Stock Level', value: `${generated.stock} units` },
                                    { label: 'Sizes', value: generated.sizes.join(', ') },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex flex-col gap-0.5 bg-white border border-slate-100 rounded-xl px-3.5 py-2.5 text-left">
                                        <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
                                        <span className="text-xs text-slate-800 font-black">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Description preview */}
                            <div className="bg-white border border-slate-100 rounded-xl px-3.5 py-2.5 text-left">
                                <span className="text-[8.5px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Description</span>
                                <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">{generated.description}</p>
                            </div>

                            <p className="text-[10px] text-slate-400 font-semibold text-center">
                                These values will be pre-filled into the product form. You can edit them before saving.
                            </p>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                    {!generated ? (
                        <>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="h-11 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleGenerate}
                                disabled={isGenerating || !prompt.trim()}
                                className="h-11 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border-none disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-200"
                            >
                                <Wand2 className="w-4 h-4" />
                                Generate
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="h-11 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Regenerate
                            </button>
                            <button
                                type="button"
                                onClick={handleApply}
                                className={`h-11 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border-none shadow-md ${
                                    appliedSuccess
                                        ? 'bg-emerald-500 shadow-emerald-200'
                                        : 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-violet-200'
                                }`}
                            >
                                {appliedSuccess ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Applied!
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        Apply to Form
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>,
        document.body
    );
}

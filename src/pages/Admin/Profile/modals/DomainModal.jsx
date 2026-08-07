import React, { useState } from 'react';
import { X, Link2, ExternalLink, Globe, ArrowRight } from 'lucide-react';
import DomainConfigModal from './DomainConfigModal';

export default function DomainModal({ isOpen, onClose, storeSlug = 'my-store' }) {
    const [showConfigModal, setShowConfigModal] = useState(false);

    if (!isOpen) return null;

    const storeUrl = `https://${storeSlug}.ecom.studio`;

    return (
        <>
            <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-sm">
                <div className="absolute inset-0" onClick={onClose} />

                {/* Sheet card */}
                <div className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-sm border border-slate-100 p-6 flex flex-col z-10 text-left">
                    
                    {/* Handle bar (mobile) */}
                    <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5 sm:hidden" />

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col gap-0.5">
                            <h3 className="text-sm font-bold text-slate-900">Domain Configuration</h3>
                            <p className="text-[10px] text-slate-400 font-normal">Manage your store link & custom domain</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Store link card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <Link2 className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={1.5} />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Store Link</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-[13px] font-semibold text-slate-700 truncate">
                                {storeUrl}
                            </span>
                            <a
                                href={storeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
                                title="Open store"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center gap-2 mb-6 px-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-[10px] text-slate-400 font-normal">Store is live on the default subdomain</span>
                    </div>

                    {/* Configure domain CTA */}
                    <button
                        onClick={() => setShowConfigModal(true)}
                        className="w-full h-12 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-2xl border-none cursor-pointer flex items-center justify-center gap-2 transition-all"
                    >
                        <Globe className="w-4 h-4" />
                        <span>Configure Custom Domain</span>
                        <ArrowRight className="w-4 h-4 ml-auto" />
                    </button>
                </div>
            </div>

            {/* Nested domain config modal */}
            <DomainConfigModal
                isOpen={showConfigModal}
                onClose={() => setShowConfigModal(false)}
            />
        </>
    );
}

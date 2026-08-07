import React, { useState } from 'react';
import { X, Globe, CheckCircle2, AlertCircle, Copy, RefreshCw } from 'lucide-react';

const STEPS = ['Enter Domain', 'DNS Verification', 'Confirm'];

export default function DomainConfigModal({ isOpen, onClose }) {
    const [step, setStep] = useState(0);
    const [domain, setDomain] = useState('');
    const [domainError, setDomainError] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const cname = 'stores.ecom.studio';

    const validateDomain = (val) => {
        const pattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
        return pattern.test(val);
    };

    const handleNext = () => {
        if (step === 0) {
            if (!domain.trim()) {
                setDomainError('Please enter a domain name.');
                return;
            }
            if (!validateDomain(domain.trim())) {
                setDomainError('Enter a valid domain e.g. shop.mybrand.com');
                return;
            }
            setDomainError('');
            setStep(1);
        } else if (step === 1) {
            // Simulate verification
            setVerifying(true);
            setTimeout(() => {
                setVerifying(false);
                setVerified(true);
                setStep(2);
            }, 2000);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(cname);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClose = () => {
        setStep(0);
        setDomain('');
        setDomainError('');
        setVerified(false);
        setVerifying(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/70 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={handleClose} />

            <div className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-sm border border-slate-100 p-6 flex flex-col z-10 text-left">

                {/* Handle */}
                <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5 sm:hidden" />

                {/* Header */}
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-bold text-slate-900">Custom Domain Setup</h3>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-1.5 mb-6 mt-3">
                    {STEPS.map((label, i) => (
                        <React.Fragment key={i}>
                            <div className="flex items-center gap-1">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${
                                    i < step ? 'bg-emerald-500 text-white' :
                                    i === step ? 'bg-slate-900 text-white' :
                                    'bg-slate-100 text-slate-400'
                                }`}>
                                    {i < step ? '✓' : i + 1}
                                </div>
                                <span className={`text-[10px] font-medium hidden sm:block ${i === step ? 'text-slate-700' : 'text-slate-350'}`}>
                                    {label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`flex-1 h-px transition-colors ${i < step ? 'bg-emerald-300' : 'bg-slate-100'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* ── Step 0: Enter Domain ── */}
                {step === 0 && (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Custom Domain</label>
                            <div className="relative">
                                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-350" strokeWidth={1.5} />
                                <input
                                    type="text"
                                    value={domain}
                                    onChange={(e) => { setDomain(e.target.value); setDomainError(''); }}
                                    placeholder="shop.yourbrand.com"
                                    className="w-full h-11 pl-10 pr-4 border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-800 text-[13px] rounded-xl focus:border-slate-700 focus:outline-none transition-all"
                                />
                            </div>
                            {domainError && (
                                <div className="flex items-center gap-1.5 text-rose-500">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span className="text-[10px] font-medium">{domainError}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                            Enter the custom subdomain or root domain you own. You'll need access to your DNS provider in the next step.
                        </p>
                    </div>
                )}

                {/* ── Step 1: DNS Verification ── */}
                {step === 1 && (
                    <div className="flex flex-col gap-4">
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                            Add the following <strong className="text-slate-700">CNAME record</strong> to your DNS provider for <span className="font-semibold text-slate-700">{domain}</span>:
                        </p>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
                            <div className="flex justify-between items-center text-[10px]">
                                <span className="text-slate-400 font-bold uppercase tracking-wider">Type</span>
                                <span className="font-semibold text-slate-700">CNAME</span>
                            </div>
                            <div className="h-px bg-slate-100" />
                            <div className="flex justify-between items-center text-[10px]">
                                <span className="text-slate-400 font-bold uppercase tracking-wider">Name / Host</span>
                                <span className="font-semibold text-slate-700">@</span>
                            </div>
                            <div className="h-px bg-slate-100" />
                            <div className="flex justify-between items-center text-[10px] gap-2">
                                <span className="text-slate-400 font-bold uppercase tracking-wider shrink-0">Value / Target</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-slate-700 text-right truncate max-w-[140px]">{cname}</span>
                                    <button
                                        onClick={handleCopy}
                                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                                    >
                                        {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {verifying && (
                            <div className="flex items-center gap-2 text-blue-500">
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span className="text-[10px] font-medium">Checking DNS propagation…</span>
                            </div>
                        )}
                        <p className="text-[10px] text-slate-400">DNS changes can take up to 48 hours to propagate. Click Verify when ready.</p>
                    </div>
                )}

                {/* ── Step 2: Confirm ── */}
                {step === 2 && (
                    <div className="flex flex-col items-center gap-4 py-2">
                        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                        </div>
                        <div className="text-center flex flex-col gap-1">
                            <span className="text-sm font-bold text-slate-800">Domain Connected!</span>
                            <span className="text-[12px] text-slate-500 font-normal">{domain}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                            Your custom domain has been verified and linked to your store. SSL is being provisioned automatically.
                        </p>
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3 mt-6">
                    {step > 0 && step < 2 && (
                        <button
                            onClick={() => setStep(s => s - 1)}
                            className="h-11 flex-1 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                        >
                            Back
                        </button>
                    )}
                    {step < 2 ? (
                        <button
                            onClick={handleNext}
                            disabled={verifying}
                            className="h-11 flex-1 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-all cursor-pointer border-none disabled:opacity-60"
                        >
                            {step === 0 ? 'Continue' : verifying ? 'Verifying…' : 'Verify DNS'}
                        </button>
                    ) : (
                        <button
                            onClick={handleClose}
                            className="h-11 flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer border-none"
                        >
                            Done
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

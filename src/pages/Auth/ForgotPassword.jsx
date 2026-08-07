import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldAlert, Sparkles, ChevronLeft } from 'lucide-react';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setErrorMsg('Please enter your email address.');
            return;
        }

        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen w-full bg-white text-slate-900 flex select-none font-sans">
            
            {/* ──────────────────────────────────────────────────────────────────────── */}
            {/* 📱 MOBILE VIEW ONLY (lg:hidden) — Curved Sheet Layout from Screenshot */}
            {/* ──────────────────────────────────────────────────────────────────────── */}
            <div className="flex lg:hidden flex-col w-full min-h-screen bg-orange-500 relative overflow-x-hidden">
                {/* Mobile Orange Header */}
                <div className="w-full h-56 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden flex flex-col justify-between p-6 text-white">
                    <div className="absolute top-4 -right-10 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -top-12 right-20 w-40 h-40 bg-orange-300/30 rounded-full blur-xl pointer-events-none" />
                    <div className="absolute top-20 right-1/4 w-28 h-28 bg-white/40 rounded-full blur-lg pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.25),transparent_70%)] pointer-events-none" />

                    <div className="relative z-10">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-700/80 hover:bg-orange-850 text-white text-xs font-semibold rounded-full shadow-sm backdrop-blur-md transition-all border-none cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Back</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Card Bottom Sheet */}
                <div className="w-full bg-white rounded-t-[36px] px-6 py-8 shadow-2xl relative z-10 -mt-16 flex flex-col gap-6 flex-1 min-h-[calc(100vh-160px)] animate-pageSlideUp">
                    {!isSubmitted ? (
                        <>
                            <div className="text-center">
                                <h1 className="text-2xl font-extrabold text-orange-500 tracking-tight">Reset Password</h1>
                                <p className="text-xs text-slate-400 font-semibold mt-1">Enter your email for instructions</p>
                            </div>

                            {errorMsg && (
                                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold rounded-2xl flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4 shrink-0" />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                                <fieldset className="border border-slate-200 focus-within:border-orange-500 rounded-2xl px-4 pb-2 pt-1 transition-colors group">
                                    <legend className="text-[11px] font-semibold text-slate-500 group-focus-within:text-orange-500 px-1.5 bg-white">
                                        Email Address
                                    </legend>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="yourname@example.com"
                                        required
                                        className="w-full h-8 bg-transparent text-slate-900 text-xs font-medium placeholder:text-slate-350 focus:outline-none"
                                    />
                                </fieldset>

                                <button
                                    type="submit"
                                    className="h-12 w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-2xl transition-all cursor-pointer flex items-center justify-center border-none shadow-[0_4px_16px_rgba(249,115,22,0.25)]"
                                >
                                    Send Reset Link
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-center gap-6 py-4">
                            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                                <Sparkles className="w-7 h-7" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h1 className="text-xl font-extrabold text-slate-900">Check Your Inbox</h1>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
                                    We have sent a password reset link to <span className="font-bold text-slate-900">{email}</span>. Click the link inside the email to configure your new password.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate('/login')}
                                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all shadow-[0_4px_16px_rgba(249,115,22,0.2)]"
                            >
                                Back to Log In
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ──────────────────────────────────────────────────────────────────────── */}
            {/* 💻 WEB DESKTOP VIEW ONLY (lg:grid) — Full Page 2-Column (No Containers) */}
            {/* ──────────────────────────────────────────────────────────────────────── */}
            <div className="hidden lg:grid w-full min-h-screen grid-cols-2">
                
                {/* LEFT COLUMN: E-Commerce Brand Banner */}
                <div className="flex flex-col justify-between p-16 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white min-h-screen relative overflow-hidden">
                    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-orange-300/30 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-orange-700/40 rounded-full blur-[110px] pointer-events-none" />

                    {/* Brand Badge */}
                    <div className="relative z-10 flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-white text-orange-650 flex items-center justify-center font-black text-base shadow-sm">
                            N
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-white">Nemvol Studio</span>
                    </div>

                    {/* Content tailored for E-commerce platform */}
                    <div className="relative z-10 my-auto max-w-lg">
                        <span className="text-xs font-bold text-orange-100 uppercase tracking-widest">Premium Storefront</span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mt-3">
                            Recover your style account
                        </h2>
                        <p className="text-xs text-orange-100/90 font-medium leading-relaxed mt-4">
                            Enter your email to request a secure link to reset your password and regain full access to your personalized boutique shopping account.
                        </p>
                    </div>

                    {/* Partner Brands */}
                    <div className="relative z-10 flex flex-col gap-4 pt-8 border-t border-white/15">
                        <span className="text-xs font-semibold text-orange-100/80">Trusted by modern brands</span>
                        <div className="flex items-center justify-between text-white/90 text-xs font-extrabold gap-4 uppercase tracking-wider">
                            <span>Nike</span>
                            <span>Adidas</span>
                            <span>Zara</span>
                            <span>Gucci</span>
                            <span>Uniqlo</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Clean Full Page Light Sign In Form */}
                <div className="flex flex-col justify-center items-center p-16 bg-white text-slate-900 min-h-screen">
                    <div className="flex flex-col gap-6 w-full max-w-md animate-pageSlideUp">
                        
                        {!isSubmitted ? (
                            <>
                                <div className="flex flex-col text-left">
                                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Reset Password</h1>
                                    <p className="text-xs text-slate-400 font-medium mt-1">
                                        Enter the email associated with your account to receive instructions.
                                    </p>
                                </div>

                                {errorMsg && (
                                    <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
                                        <ShieldAlert className="w-4 h-4 shrink-0" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[11px] font-extrabold text-slate-800">Email address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="yourname@example.com"
                                            required
                                            className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl text-slate-900 text-xs font-medium placeholder:text-slate-350 focus:outline-none transition-all"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="h-12 w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center border-none shadow-[0_4px_16px_rgba(249,115,22,0.2)]"
                                    >
                                        Send Reset Link
                                    </button>

                                    <div className="text-center text-xs text-slate-500 font-medium mt-1">
                                        Remembered your password?{' '}
                                        <Link
                                            to="/login"
                                            className="text-orange-500 font-bold hover:underline ml-0.5"
                                        >
                                            Log in
                                        </Link>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="flex flex-col items-center text-center gap-6 animate-pageSlideUp">
                                <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                                    <Sparkles className="w-7 h-7" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Check Your Inbox</h1>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
                                        We have sent a password reset link to <span className="font-bold text-slate-900">{email}</span>. Click the link inside the email to configure your new password.
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all shadow-[0_4px_16px_rgba(249,115,22,0.2)]"
                                >
                                    Back to Log In
                                </button>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}

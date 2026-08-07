import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldAlert, ChevronLeft } from 'lucide-react';
import { useLogin } from '../../hooks/useAuth';

export default function Login() {
    const navigate = useNavigate();
    const { mutateAsync: loginUser, isPending: isLoadingAuth } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            setErrorMsg('Please enter your email address and password.');
            return;
        }

        try {
            await loginUser({ email: trimmedEmail, password: trimmedPassword });
            const params = new URLSearchParams(window.location.search);
            navigate(params.get('redirect') || '/profile');
        } catch (err) {
            setErrorMsg(err.message || 'Login failed. Please try again.');
        }
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
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-700/80 hover:bg-orange-850 text-white text-xs font-semibold rounded-full shadow-sm backdrop-blur-md transition-all border-none cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Back</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Card Bottom Sheet */}
                <div className="w-full bg-white rounded-t-[36px] px-6 py-8 shadow-2xl relative z-10 -mt-16 flex flex-col gap-6 flex-1 min-h-[calc(100vh-160px)] animate-pageSlideUp">
                    <div className="text-center">
                        <h1 className="text-2xl font-extrabold text-orange-500 tracking-tight">Welcome Back</h1>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Sign in to your user account</p>
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
                                Email
                            </legend>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                                required
                                className="w-full h-8 bg-transparent text-slate-900 text-xs font-medium placeholder:text-slate-300 focus:outline-none"
                            />
                        </fieldset>

                        <fieldset className="border border-slate-200 focus-within:border-orange-500 rounded-2xl px-4 pb-2 pt-1 transition-colors group">
                            <legend className="text-[11px] font-semibold text-slate-500 group-focus-within:text-orange-500 px-1.5 bg-white">
                                Password
                            </legend>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    required
                                    className="w-full h-8 bg-transparent text-slate-900 text-xs font-medium placeholder:text-slate-300 focus:outline-none pr-8"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 text-slate-400 hover:text-slate-700 transition-colors border-none bg-transparent cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </fieldset>

                        <div className="flex items-center justify-between mt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    className="w-4.5 h-4.5 rounded-md border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                />
                                <span className="text-[11.5px] text-slate-500 font-medium">
                                    Keep me logged in
                                </span>
                            </label>
                            <Link to="/forgot-password" className="text-[11px] font-bold text-orange-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoadingAuth}
                            className="h-12 w-full mt-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-sm rounded-2xl transition-all cursor-pointer flex items-center justify-center border-none shadow-[0_4px_16px_rgba(249,115,22,0.25)]"
                        >
                            {isLoadingAuth ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <div className="relative flex items-center justify-center my-1">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100" />
                        </div>
                        <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">Sign in with</span>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                        {['Facebook', 'Twitter', 'Google', 'Apple'].map((platform, i) => (
                            <button
                                key={platform}
                                type="button"
                                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-transform hover:scale-110 border-none cursor-pointer"
                            >
                                {i === 0 && <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>}
                                {i === 1 && <svg className="w-4.5 h-4.5 fill-[#1DA1F2]" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" /></svg>}
                                {i === 2 && <svg className="w-4.5 h-4.5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" /><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" /><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z" /><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z" /></svg>}
                                {i === 3 && <svg className="w-4.5 h-4.5 fill-slate-900" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.81 1.44-.61.71-1.14 1.86-.99 2.97 1.07.08 2.15-.57 2.81-1.37z" /></svg>}
                            </button>
                        ))}
                    </div>

                    <div className="text-center text-xs text-slate-500 font-medium pt-2">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-orange-500 font-bold hover:underline ml-0.5"
                        >
                            Sign up
                        </Link>
                    </div>
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
                            Discover the art of minimal living
                        </h2>
                        <p className="text-xs text-orange-100/90 font-medium leading-relaxed mt-4">
                            Log in to track your orders, manage shipping information, manage your wishlist, and experience our seamless layout and checkout experience.
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
                        
                        <div className="flex flex-col text-left">
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Get Started Now</h1>
                            <p className="text-xs text-slate-400 font-medium mt-1">
                                Please log in to your account to continue.
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
                                    placeholder="workmail@gmail.com"
                                    required
                                    className="w-full h-12 px-4 bg-white border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl text-slate-900 text-xs font-medium placeholder:text-slate-350 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-extrabold text-slate-800">Password</label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-[10.5px] text-orange-500 font-bold hover:underline"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        required
                                        className="w-full h-12 pl-4 pr-10 bg-white border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl text-slate-900 text-xs font-medium placeholder:text-slate-350 focus:outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors border-none bg-transparent cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    className="w-4.5 h-4.5 rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                />
                                <span className="text-[11.5px] text-slate-600 font-medium">
                                    I agree to the <span className="text-slate-900 font-bold underline">Terms & Privacy</span>
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={isLoadingAuth}
                                className="h-12 w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center border-none shadow-[0_4px_16px_rgba(249,115,22,0.2)]"
                            >
                                {isLoadingAuth ? 'Signing in...' : 'Log in'}
                            </button>

                            <div className="text-center text-xs text-slate-500 font-medium mt-1">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-orange-500 font-bold hover:underline ml-0.5"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>

                        <div className="relative flex items-center justify-center my-1">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200/80" />
                            </div>
                            <span className="relative bg-white px-3 text-[10.5px] text-slate-400 font-medium">Or</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="h-12 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" /><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" /><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z" /><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z" /></svg>
                                <span>Google</span>
                            </button>

                            <button
                                type="button"
                                className="h-12 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-all cursor-pointer"
                            >
                                <svg className="w-4 h-4 fill-slate-900" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.81 1.44-.61.71-1.14 1.86-.99 2.97 1.07.08 2.15-.57 2.81-1.37z" /></svg>
                                <span>Apple</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useLogin } from '../../hooks/useAuth';

export default function Login() {
    const navigate = useNavigate();
    const { mutateAsync: loginUser, isPending: isLoadingAuth } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both your email and password.');
            return;
        }

        try {
            await loginUser({ email, password });
            // Redirect to the page they were trying to visit, or profile
            const params = new URLSearchParams(window.location.search);
            navigate(params.get('redirect') || '/profile');
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white">
            
            {/* Left Column: Premium Brand Photography (Desktop only) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 overflow-hidden items-end p-16">
                <img
                    src={`${import.meta.env.BASE_URL}hero1.webp`}
                    alt="Nemvol Fashion Collection"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-[10.5s] hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-slate-900/30 to-transparent z-10" />

                {/* Brand Overlay Text */}
                <div className="relative z-20 bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-md text-white">
                    <img src={`${import.meta.env.BASE_URL}image.svg`} alt="Nemvol Logo" className="w-10 h-10 mb-4 object-contain brightness-0 invert" />
                    <h2 className="text-2xl font-black tracking-wider uppercase mb-2">Nemvol Storefront</h2>
                    <p className="text-xs font-semibold text-white/80 leading-relaxed">
                        Discover clean aesthetics and premium quality materials designed for the modern lifestyle.
                    </p>
                </div>
            </div>

            {/* Right Column: Login Form (Mobile and Desktop) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-16">
                <div className="w-full max-w-md flex flex-col gap-8">
                    
                    {/* Header: Clean Brand Logo & Slogan */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <Link to="/" className="mb-6 hover:opacity-90 transition-opacity">
                            <img src={`${import.meta.env.BASE_URL}image.svg`} alt="Nemvol Logo" className="w-8 h-8 object-contain" />
                        </Link>
                        <h1 className="text-3xl font-black text-slate-950 tracking-tight">Welcome back</h1>
                        <p className="text-xs text-slate-400 font-bold mt-1.5 uppercase tracking-wider">
                            Sign in to continue to your account
                        </p>
                    </div>

                    {/* Form container with strict spacing */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {error && (
                            <div className="text-xs font-bold text-red-600 bg-red-50 p-4 rounded-xl border border-red-100/80 animate-fade-in">
                                {error}
                            </div>
                        )}

                        {/* Email Input Field */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-2.5">
                                Email Address
                            </label>
                            <div className="flex items-center h-12 px-4 bg-slate-50 border border-slate-100 hover:border-slate-200/80 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100/40 rounded-xl transition-all duration-300 group">
                                <Mail className="w-4 h-4 text-slate-400 mr-3 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent text-sm text-slate-900 font-semibold focus:outline-none placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input Field */}
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-2.5">
                                <label className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">
                                    Password
                                </label>
                                <Link to="/forgot-password" className="text-[10px] font-extrabold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="flex items-center h-12 px-4 bg-slate-50 border border-slate-100 hover:border-slate-200/80 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100/40 rounded-xl transition-all duration-300 group">
                                <Lock className="w-4 h-4 text-slate-400 mr-3 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex-1 bg-transparent text-sm text-slate-900 font-semibold focus:outline-none placeholder:text-slate-300"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors ml-2"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                                </button>
                            </div>
                        </div>

                        {/* Session Preference Option */}
                        <div className="flex items-center gap-2.5 select-none py-1">
                            <input
                                type="checkbox"
                                id="remember-me"
                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="text-xs font-bold text-slate-400 cursor-pointer uppercase tracking-wider">
                                Keep me logged in
                            </label>
                        </div>

                        {/* Main Login Trigger */}
                        <button
                            type="submit"
                            disabled={isLoadingAuth}
                            className={`w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 flex items-center justify-center gap-2 mt-4 ${
                                isLoadingAuth ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoadingAuth ? 'Signing In...' : 'Sign In'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Social Logins */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-[1px] bg-slate-100" />
                            <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest shrink-0">or continue with</span>
                            <div className="flex-1 h-[1px] bg-slate-100" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="h-12 border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all">
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.567 0-6.46-2.893-6.46-6.46s2.893-6.46 6.46-6.46c1.627 0 3.1.6 4.24 1.584l3.12-3.12C19.16 2.062 15.952 1 12.24 1 5.86 1 12.24 5.86 12.24 12.24s4.86 11.24 11.24 11.24c6.048 0 11.24-4.86 11.24-11.24v-1.955H12.24z" />
                                </svg>
                                Google
                            </button>
                            <button className="h-12 border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.74-1.2 1.88-1.05 3 .96.07 2.13-.53 2.93-1.44z" />
                                </svg>
                                Apple
                            </button>
                        </div>
                    </div>

                    {/* Footer Redirection Link */}
                    <p className="text-xs text-slate-400 font-bold text-center lg:text-left mt-4 uppercase tracking-wider">
                        New to Nemvol?{' '}
                        <Link to="/signup" className="text-blue-600 hover:text-blue-700 transition-colors ml-1 font-extrabold">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

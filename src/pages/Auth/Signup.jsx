import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export default function Signup() {
    const navigate = useNavigate();
    const { signupUser, isLoadingAuth } = useEcommerce();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all the required fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!agreeTerms) {
            setError('You must agree to the Terms of Service & Privacy Policy.');
            return;
        }

        try {
            await signupUser(name, email, password);
            navigate('/profile');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white">
            
            {/* Left Column: Premium Brand Photography (Desktop only) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 overflow-hidden items-end p-16">
                <img
                    src={`${import.meta.env.BASE_URL}hero2.webp`}
                    alt="Nemvol Women Collection"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-[10.5s] hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-slate-900/30 to-transparent z-10" />

                {/* Brand Overlay Text */}
                <div className="relative z-20 bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-md text-white">
                    <img src={`${import.meta.env.BASE_URL}image.svg`} alt="Nemvol Logo" className="w-10 h-10 mb-4 object-contain brightness-0 invert" />
                    <h2 className="text-2xl font-black tracking-wider uppercase mb-2">Join Nemvol</h2>
                    <p className="text-xs font-semibold text-white/80 leading-relaxed">
                        Become a member to receive exclusive drops, curated lookbooks, and early access sales.
                    </p>
                </div>
            </div>

            {/* Right Column: Register Form (Mobile and Desktop) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-16">
                <div className="w-full max-w-md flex flex-col gap-8">
                    
                    {/* Header */}
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <Link to="/" className="mb-6 hover:opacity-90 transition-opacity">
                            <img src={`${import.meta.env.BASE_URL}image.svg`} alt="Nemvol Logo" className="w-8 h-8 object-contain" />
                        </Link>
                        <h1 className="text-3xl font-black text-slate-950 tracking-tight">Create an account</h1>
                        <p className="text-xs text-slate-400 font-bold mt-1.5 uppercase tracking-wider">
                            Set up your profile to enjoy simple checkouts
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {error && (
                            <div className="text-xs font-bold text-red-600 bg-red-50 p-4 rounded-xl border border-red-100/80 animate-fade-in">
                                {error}
                            </div>
                        )}

                        {/* Full Name Input */}
                        <div className="flex flex-col">
                            <label className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-2.5">
                                Full Name
                            </label>
                            <div className="flex items-center h-12 px-4 bg-slate-50 border border-slate-100 hover:border-slate-200/80 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100/40 rounded-xl transition-all duration-300 group">
                                <User className="w-4 h-4 text-slate-400 mr-3 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="e.g. Lana Johnson"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="flex-1 bg-transparent text-sm text-slate-900 font-semibold focus:outline-none placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
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

                        {/* Password Inputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-2.5">
                                    Password
                                </label>
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
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest mb-2.5">
                                    Confirm
                                </label>
                                <div className="flex items-center h-12 px-4 bg-slate-50 border border-slate-100 hover:border-slate-200/80 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100/40 rounded-xl transition-all duration-300 group">
                                    <Lock className="w-4 h-4 text-slate-400 mr-3 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="flex-1 bg-transparent text-sm text-slate-900 font-semibold focus:outline-none placeholder:text-slate-300"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password Toggle */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-[10px] font-extrabold text-slate-400 hover:text-slate-600 focus:outline-none uppercase tracking-wider transition-colors"
                            >
                                {showPassword ? 'Hide Passwords' : 'Show Passwords'}
                            </button>
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-start gap-2.5 select-none py-1">
                            <input
                                type="checkbox"
                                id="agree-terms"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="w-4.5 h-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-0.5"
                                required
                            />
                            <label htmlFor="agree-terms" className="text-xs font-bold text-slate-400 cursor-pointer leading-relaxed uppercase tracking-wider">
                                I agree to the{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                                    Terms
                                </a>{' '}
                                &{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                                    Privacy
                                </a>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoadingAuth}
                            className={`w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 flex items-center justify-center gap-2 mt-4 ${
                                isLoadingAuth ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoadingAuth ? 'Creating Account...' : 'Sign Up'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Footer Links */}
                    <p className="text-xs text-slate-400 font-bold text-center lg:text-left mt-2 uppercase tracking-wider">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 transition-colors ml-1 font-extrabold">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen w-full flex bg-white">
            
            {/* Left Column: Premium Brand Photography (Desktop only) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 overflow-hidden items-end p-12">
                <img
                    src={`${import.meta.env.BASE_URL}herobanner.jpeg`}
                    alt="Nemvol Fashion Gallery"
                    className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-[10s] hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-slate-900/30 to-transparent z-10" />

                {/* Brand Overlay Text */}
                <div className="relative z-20 bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-lg text-white">
                    <img src={`${import.meta.env.BASE_URL}image.svg`} alt="Nemvol Logo" className="w-12 h-12 mb-4 object-contain brightness-0 invert" />
                    <h2 className="text-2xl font-black tracking-wider uppercase mb-2">Style Restored</h2>
                    <p className="text-sm font-medium text-white/80 leading-relaxed">
                        Recover access to your Nemvol account and return to your boutique shopping experience.
                    </p>
                </div>
            </div>

            {/* Right Column: Reset Form & Success Message (Mobile and Desktop) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md flex flex-col gap-6">
                    
                    {!isSubmitted ? (
                        <>
                            {/* Header */}
                            <div className="flex flex-col gap-2 items-center text-center lg:items-start lg:text-left">
                                <Link to="/login" className="mb-4 inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-950 transition-colors uppercase tracking-wider">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to login
                                </Link>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Reset password</h1>
                                <p className="text-xs md:text-sm text-slate-400 font-medium">
                                    Enter the email associated with your account and we'll send reset instructions.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {error && (
                                    <div className="text-xs font-semibold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">
                                        {error}
                                    </div>
                                )}

                                {/* Email Input */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                    <div className="flex items-center h-12 px-4 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-blue-600 focus-within:bg-white transition-all group">
                                        <Mail className="w-4 h-4 text-slate-400 mr-3 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="yourname@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-slate-900 focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 mt-2"
                                >
                                    Send Reset Link
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </>
                    ) : (
                        /* Success View */
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 animate-scale-up">
                            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                                <CheckCircle2 className="w-7 h-7" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Check your inbox</h1>
                                <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                                    We have sent a password reset link to <span className="font-bold text-slate-900">{email}</span>. Click the link inside the email to configure your new password.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate('/login')}
                                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md mt-4"
                            >
                                Back to Log In
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

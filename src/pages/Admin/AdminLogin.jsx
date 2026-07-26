import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcommerce } from '../../context/EcommerceContext';
import { Lock, Mail, Eye, EyeOff, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
    const navigate = useNavigate();
    const { loginAdmin, isAdminLoggedIn, isLoadingAuth, errors } = useEcommerce();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // If admin is already logged in, redirect immediately to admin dashboard
    React.useEffect(() => {
        if (isAdminLoggedIn) {
            navigate('/admin');
        }
    }, [isAdminLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!email.trim() || !password.trim()) {
            setErrorMsg('Please fill in both email and password.');
            return;
        }

        try {
            await loginAdmin(email.trim(), password.trim());
            navigate('/admin');
        } catch (err) {
            setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
        }
    };

    const fillPresetCredentials = () => {
        setEmail('admin@nemvol.com');
        setPassword('admin123');
        setErrorMsg('');
    };

    return (
        <div className="min-h-screen bg-[#020B1E] text-slate-100 flex items-center justify-center p-4 select-none relative overflow-hidden">
            {/* Background decorative blurry circles */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md bg-[#04122C]/90 border border-blue-950/40 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative z-10 flex flex-col gap-6">
                
                {/* Header branding */}
                <div className="text-center">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20 mx-auto mb-4">
                        A
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">Admin Console</h2>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium">Please sign in to access the store management dashboard</p>
                </div>

                {/* Error Banner */}
                {(errorMsg || errors.auth) && (
                    <div className="p-4 bg-red-950/30 border border-red-900/50 text-red-400 text-xs font-bold rounded-2xl flex items-start gap-2.5 animate-fadeIn">
                        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMsg || errors.auth}</span>
                    </div>
                )}

                {/* Credentials fill helper */}
                <button
                    type="button"
                    onClick={fillPresetCredentials}
                    className="p-3 bg-blue-950/20 hover:bg-blue-950/40 border border-blue-900/35 rounded-2xl text-[10px] text-blue-400 font-bold uppercase tracking-wider text-center transition-all cursor-pointer"
                >
                    💡 Autofill Preset Admin Credentials
                </button>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                <Mail className="w-4 h-4" />
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="w-full h-12 pl-10 pr-4 bg-[#010919] border border-blue-950/80 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-12 pl-10 pr-10 bg-[#010919] border border-blue-950/80 rounded-2xl text-slate-200 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoadingAuth}
                        className={`h-12 w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-600/15 transition-all flex items-center justify-center ${
                            isLoadingAuth ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                    >
                        {isLoadingAuth ? 'Authenticating...' : 'Sign In To Panel'}
                    </button>
                </form>

                {/* Back to storefront link */}
                <div className="text-center pt-2 border-t border-blue-950/40">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-[10px] text-slate-400 hover:text-white font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                        &larr; Return to Storefront
                    </button>
                </div>

            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="hidden md:block w-full bg-white text-slate-500 border-t border-slate-100/80 relative overflow-hidden mt-auto">
            {/* Halo Glow Effect: Soft radial blue light centered at the top border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-10 pt-16 pb-12 relative z-10">
                {/* Upper Grid */}
                <div className="grid grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand Profile */}
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                            <img 
                                src="/image.svg" 
                                alt="Nemvol Logo" 
                                className="w-7 h-7 object-contain" 
                            />
                            <span className="text-sm font-black tracking-widest text-slate-900">NEMVOL</span>
                        </Link>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                            Minimalist apparel curated for the modern wardrobe. Less is more.
                        </p>
                    </div>

                    {/* Catalog Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-800">Catalog</h4>
                        <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-400">
                            <li><Link to="/" className="hover:text-slate-900 transition-colors">Home</Link></li>
                            <li><Link to="/products" className="hover:text-slate-900 transition-colors">Shop All</Link></li>
                            <li><Link to="/wishlist" className="hover:text-slate-900 transition-colors">Wishlist</Link></li>
                            <li><Link to="/profile" className="hover:text-slate-900 transition-colors">Account</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-800">Assistance</h4>
                        <ul className="flex flex-col gap-2.5 text-xs font-semibold text-slate-400">
                            <li><a href="#" className="hover:text-slate-900 transition-colors">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-slate-900 transition-colors">Easy Returns</a></li>
                            <li><a href="#" className="hover:text-slate-900 transition-colors">Help / FAQ</a></li>
                            <li><a href="#" className="hover:text-slate-900 transition-colors">Support Care</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-800">Newsletter</h4>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-[220px]">
                            Join our subscriber drops for access to capsule releases.
                        </p>

                        {!isSubscribed ? (
                            <form onSubmit={handleSubscribe} className="flex items-center h-10 border-b border-slate-200 focus-within:border-blue-600 transition-all relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent text-xs text-slate-950 focus:outline-none placeholder:text-slate-300 pb-1"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 bottom-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                                    aria-label="Subscribe"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50/50 border border-blue-100/50 p-2.5 rounded-xl animate-fade-in">
                                <Check className="w-3.5 h-3.5 shrink-0" />
                                Subscribed successfully.
                            </div>
                        )}
                    </div>

                </div>

                {/* Bottom Row */}
                <div className="border-t border-slate-100 pt-8 flex items-center justify-between">
                    {/* Copyright */}
                    <span className="text-[10px] text-slate-400 font-semibold">
                        &copy; 2026 Nemvol. All rights reserved.
                    </span>

                    {/* Socials & Cards */}
                    <div className="flex items-center gap-6">
                        {/* Social glyphs */}
                        <div className="flex items-center gap-3.5">
                            <a href="#" className="text-slate-300 hover:text-slate-950 transition-colors" aria-label="Instagram">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="#" className="text-slate-300 hover:text-slate-950 transition-colors" aria-label="Facebook">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-slate-300 hover:text-slate-950 transition-colors" aria-label="Twitter">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </a>
                        </div>

                        {/* Cards */}
                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-slate-300 tracking-wider">
                            <span className="px-1.5 py-0.5 border border-slate-100 rounded bg-slate-50">Visa</span>
                            <span className="px-1.5 py-0.5 border border-slate-100 rounded bg-slate-50">Master</span>
                            <span className="px-1.5 py-0.5 border border-slate-100 rounded bg-slate-50">Apple</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

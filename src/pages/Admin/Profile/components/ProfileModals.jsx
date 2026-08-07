import React from 'react';
import { X, Save, Sparkles, Award } from 'lucide-react';

// 1. EDIT PROFILE MODAL
export function EditProfileModal({ isOpen, onClose, editForm, setEditForm, onSave }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <form 
                onSubmit={onSave}
                className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col animate-scaleUp z-10 text-left"
            >
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Edit Profile</h3>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Admin Name</label>
                        <input
                            type="text"
                            required
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full h-11 px-4 border border-slate-200 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-800 focus:outline-none transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            required
                            value={editForm.email}
                            onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full h-11 px-4 border border-slate-200 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-800 focus:outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-11 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="h-11 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                    >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

// 2. PLAN & SUBSCRIPTION MODAL
export function PlanModal({ isOpen, onClose, onManage }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col animate-scaleUp z-10 text-left">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Plan & Subscription</h3>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="bg-[#18181B] rounded-2xl p-4.5 text-white flex flex-col gap-3 mb-6 relative">
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[9px] font-black uppercase tracking-wider">
                        Active
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Sparkles className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-black uppercase tracking-wide">Enterprise Studio</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                        Dynamic pricing, multi-admin settings, high speed API hooks, and developer sandbox are fully active on this workspace.
                    </p>
                    <div className="h-px bg-white/5 my-1" />
                    <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400 font-semibold uppercase">Renewal Date</span>
                        <span className="font-bold">Dec 31, 2026</span>
                    </div>
                </div>

                <button
                    onClick={onManage}
                    className="h-11 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none w-full"
                >
                    Manage Subscription
                </button>
            </div>
        </div>
    );
}

// 3. BADGES SHOWCASE MODAL
export function BadgesModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col animate-scaleUp z-10 text-left">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Achievements & Badges</h3>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                        { title: 'Power Admin', desc: 'Managed over 100 sales', color: 'from-amber-400 to-orange-500' },
                        { title: 'Fast Dispatch', desc: 'Orders shipped in < 2 hrs', color: 'from-blue-400 to-indigo-500' },
                        { title: 'Top Seller', desc: 'Achieved $50k sales', color: 'from-emerald-400 to-teal-500' }
                    ].map((badge, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-2.5 bg-slate-50 border border-slate-100 rounded-2xl">
                            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-md mb-2`}>
                                <Award className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-black text-slate-800 leading-tight block mb-0.5">{badge.title}</span>
                            <span className="text-[8.5px] text-slate-400 font-semibold leading-tight">{badge.desc}</span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="h-11 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none w-full"
                >
                    View All Milestones
                </button>
            </div>
        </div>
    );
}

// 4. PREFERENCES MODAL
export function PreferencesModal({ isOpen, onClose, themePreference, setThemePreference, emailNotifsEnabled, setEmailNotifsEnabled, onSave }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <form 
                onSubmit={onSave}
                className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col animate-scaleUp z-10 text-left"
            >
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Preferences</h3>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    {/* Theme Preference Selection */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">App Theme Mode</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Light', 'Dark (Preview)'].map(themeOpt => (
                                <button
                                    type="button"
                                    key={themeOpt}
                                    onClick={() => setThemePreference(themeOpt)}
                                    className={`h-10 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                                        themePreference === themeOpt
                                            ? 'bg-slate-900 text-white border-slate-900'
                                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                    }`}
                                >
                                    {themeOpt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Email notifications toggle */}
                    <div className="flex items-center justify-between py-2 border-t border-slate-50 mt-1">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-bold text-slate-800">Email Notifications</span>
                            <span className="text-[9px] font-semibold text-slate-400 uppercase">Alerts on critical order events</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setEmailNotifsEnabled(!emailNotifsEnabled)}
                            className={`w-9 h-5 rounded-full transition-colors relative focus:outline-none cursor-pointer border-none ${
                                emailNotifsEnabled ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                    emailNotifsEnabled ? 'translate-x-4' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="h-11 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none w-full"
                >
                    Save Preferences
                </button>
            </form>
        </div>
    );
}

// 5. PRIVACY POLICY MODAL
export function PrivacyModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col animate-scaleUp z-10 text-left">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Privacy Policy</h3>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="max-h-60 overflow-y-auto pr-1 flex flex-col gap-3 mb-6 scrollbar-thin">
                    <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wide">1. Data Storage</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        All configurations, settings, inventories, and categories are saved locally within your browser sandbox via secure localStorage. No external services harvest your business activity.
                    </p>
                    <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wide">2. Biometric Policies</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        Biometrics (Fingerprint/Face ID) configurations are strictly client-controlled and do not store plain passwords or map to device bios.
                    </p>
                    <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wide">3. Support Integrity</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        Your support email Address and phone widgets are stored purely to populate frontend interaction pages for storefront customers.
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="h-11 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none w-full"
                >
                    Accept Terms
                </button>
            </div>
        </div>
    );
}

// 6. HELP & SUPPORT MODAL
export function HelpModal({ isOpen, onClose, onChat }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col animate-scaleUp z-10 text-left">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Help & Support</h3>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-col gap-3.5 mb-6">
                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-1">
                        <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide">Developer Hotline</span>
                        <span className="text-xs font-bold text-blue-600">support@ecom.studio</span>
                        <span className="text-[9px] font-semibold text-slate-400 uppercase">Average response time: 30 minutes</span>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-1">
                        <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide">Documentation Sandbox</span>
                        <span className="text-xs font-bold text-slate-700">api.ecom.studio/docs</span>
                    </div>
                </div>

                <button
                    onClick={onChat}
                    className="h-11 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none w-full"
                >
                    Open Live Chat
                </button>
            </div>
        </div>
    );
}

// 7. FEEDBACK MODAL
export function FeedbackModal({ isOpen, onClose, feedbackText, setFeedbackText, onSubmit }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <form 
                onSubmit={onSubmit}
                className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col animate-scaleUp z-10 text-left"
            >
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Send Feedback</h3>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Your Message</label>
                    <textarea
                        required
                        rows={4}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Let us know how we can improve Admin Studio..."
                        className="w-full p-3.5 border border-slate-200 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-xl focus:border-slate-800 focus:outline-none transition-all resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="h-11 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none w-full"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
}

// 8. LANGUAGE SELECTION MODAL
export function LanguageModal({ isOpen, onClose, systemLanguage, onSelectLanguage }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 p-6 flex flex-col animate-scaleUp z-10 text-left">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Select Language</h3>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center border-none text-slate-400 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-col gap-1 mb-6">
                    {['English', 'Spanish', 'French', 'German'].map(lang => (
                        <button
                            key={lang}
                            onClick={() => onSelectLanguage(lang)}
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer font-bold text-xs text-slate-800 ${
                                systemLanguage === lang ? 'bg-slate-50 font-black' : ''
                            }`}
                        >
                            <span>{lang}</span>
                            {systemLanguage === lang && (
                                <div className="w-2 h-2 rounded-full bg-slate-900" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

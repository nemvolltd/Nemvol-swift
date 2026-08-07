import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    User, 
    Lock, 
    Bell, 
    Moon, 
    Info, 
    HelpCircle, 
    Trash2, 
    ChevronRight, 
    X,
    CheckCircle2
} from 'lucide-react';
import useStore from '../../store/useStore';
import { useUpdateContactInfo } from '../../hooks/useSettings';
import { useNotificationSettings, useUpdateNotificationSettings } from '../../hooks/useSettings';

export default function Settings() {
    const navigate = useNavigate();
    const user = useStore((s) => s.user);
    const { mutate: updateContactInfo } = useUpdateContactInfo();
    const { data: notificationSettings = {} } = useNotificationSettings();
    const { mutate: updateNotificationSettings } = useUpdateNotificationSettings();

    // Modal Control State: 'profile' | 'password' | 'notifications' | 'deactivate' | null
    const [activeModal, setActiveModal] = useState(null);

    // Form inputs state
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [isSaved, setIsSaved] = useState(false);

    // Password fields
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordSaved, setPasswordSaved] = useState(false);

    // Theme / Dark Mode toggle state
    const [darkMode, setDarkMode] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateContactInfo({ name, email, phone });
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            setActiveModal(null);
        }, 1500);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setPasswordSaved(true);
        setTimeout(() => {
            setPasswordSaved(false);
            setActiveModal(null);
            setCurrentPassword('');
            setNewPassword('');
        }, 1500);
    };

    const handleToggleNotification = (key) => {
        updateNotificationSettings({
            [key]: !notificationSettings[key]
        });
    };

    return (
        <div className="w-full max-w-md mx-auto px-5 py-6 animate-pageSlideUp min-h-screen pb-16 bg-slate-50/50">
            
            {/* Topbar matching mockup */}
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={() => navigate('/profile')}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
                    aria-label="Back"
                >
                    <ArrowLeft className="w-4 h-4 text-slate-800" strokeWidth={2.2} />
                </button>

                <h1 className="text-base font-bold text-slate-900">Settings</h1>

                {/* Empty spacer for alignment */}
                <div className="w-10 h-10 shrink-0" />
            </div>

            {/* User Profile Card */}
            <div 
                onClick={() => setActiveModal('profile')}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors mb-6"
            >
                <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-orange-400 to-amber-300 flex items-center justify-center text-white text-lg font-bold uppercase">
                        {user?.name ? user.name.slice(0, 2) : 'AD'}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{user?.name || 'Alfred Daniel'}</span>
                        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Premium Member</span>
                    </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            {/* Section Header */}
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Other settings</h3>

            {/* First Settings Block */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden mb-6">
                
                {/* Profile Details */}
                <div 
                    onClick={() => setActiveModal('profile')}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-650">
                            <User className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">Profile details</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-350" />
                </div>

                {/* Password */}
                <div 
                    onClick={() => setActiveModal('password')}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-655">
                            <Lock className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">Password</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-355" />
                </div>

                {/* Notifications */}
                <div 
                    onClick={() => setActiveModal('notifications')}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-660">
                            <Bell className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">Notifications</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-360" />
                </div>

                {/* Dark Mode */}
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-665">
                            <Moon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">Dark mode</span>
                    </div>
                    {/* Toggle Switch */}
                    <button
                        type="button"
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            darkMode ? 'bg-orange-500' : 'bg-slate-200'
                        }`}
                    >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-205 ease-in-out ${
                            darkMode ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                    </button>
                </div>
            </div>

            {/* Second Settings Block */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
                
                {/* About application */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-670">
                            <Info className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">About application</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-370" />
                </div>

                {/* Help/FAQ */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer border-b border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-675">
                            <HelpCircle className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">Help/FAQ</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-375" />
                </div>

                {/* Deactivate account */}
                <div 
                    onClick={() => setActiveModal('deactivate')}
                    className="flex items-center justify-between p-4 hover:bg-rose-50/30 transition-colors cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-100 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-rose-500 group-hover:text-rose-600 transition-colors">Deactivate my account</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-450 transition-colors" />
                </div>
            </div>

            {/* ── Slide-up Modals / Bottom Sheets ── */}
            {activeModal && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300"
                        onClick={() => setActiveModal(null)}
                    />

                    {/* Drawer Content */}
                    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-3xl p-6 z-50 shadow-[0_-8px_32px_rgba(0,0,0,0.15)] animate-pageSlideUp max-h-[90vh] overflow-y-auto">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-5" />
                        
                        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
                            <h3 className="text-sm font-black text-slate-900 capitalize">
                                {activeModal === 'profile' && 'Profile Details'}
                                {activeModal === 'password' && 'Change Password'}
                                {activeModal === 'notifications' && 'Notification Preferences'}
                                {activeModal === 'deactivate' && 'Deactivate Account'}
                            </h3>
                            <button 
                                onClick={() => setActiveModal(null)}
                                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Forms */}
                        {activeModal === 'profile' && (
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                                {isSaved && (
                                    <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        Profile updated successfully!
                                    </div>
                                )}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-11 px-4 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-bold"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-11 px-4 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-bold"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-slate-455 uppercase tracking-wider">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-11 px-4 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition-all font-bold"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md uppercase tracking-wider mt-4"
                                >
                                    Save Changes
                                </button>
                            </form>
                        )}

                        {activeModal === 'password' && (
                            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                                {passwordSaved && (
                                    <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        Password changed successfully!
                                    </div>
                                )}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Current Password</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="h-11 px-4 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="h-11 px-4 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md uppercase tracking-wider mt-4"
                                >
                                    Update Password
                                </button>
                            </form>
                        )}

                        {activeModal === 'notifications' && (
                            <div className="flex flex-col gap-5 py-2">
                                {/* Order Updates */}
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col max-w-[70%]">
                                        <span className="text-xs font-bold text-slate-800">Order Updates</span>
                                        <span className="text-[10px] text-slate-400 mt-0.5">Receive text/email alerts on orders.</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleNotification('orderUpdates')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.orderUpdates ? 'bg-orange-500' : 'bg-slate-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.orderUpdates ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>

                                {/* Promotions */}
                                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                    <div className="flex flex-col max-w-[70%]">
                                        <span className="text-xs font-bold text-slate-800">Promotions & Offers</span>
                                        <span className="text-[10px] text-slate-400 mt-0.5">Get discounts and coupon events.</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleNotification('promotions')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.promotions ? 'bg-orange-500' : 'bg-slate-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.promotions ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>

                                {/* Newsletters */}
                                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                    <div className="flex flex-col max-w-[70%]">
                                        <span className="text-xs font-bold text-slate-800">Weekly Newsletters</span>
                                        <span className="text-[10px] text-slate-400 mt-0.5">Get recap on new product drops.</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleNotification('newsletters')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.newsletters ? 'bg-orange-500' : 'bg-slate-200'}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.newsletters ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeModal === 'deactivate' && (
                            <div className="flex flex-col gap-4 py-2">
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Are you sure you want to deactivate your account? This action will disable your profile and discard all saved addresses, payment methods, and active orders.
                                </p>
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => setActiveModal(null)}
                                        className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all border-none cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Handle deactivation mock
                                            setActiveModal(null);
                                            navigate('/login');
                                        }}
                                        className="flex-1 h-12 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all border-none cursor-pointer"
                                    >
                                        Deactivate
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

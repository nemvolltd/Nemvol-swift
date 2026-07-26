import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Sliders, CheckCircle2 } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export default function Settings() {
    const navigate = useNavigate();
    const { contactInfo, updateContactInfo, notificationSettings, updateNotificationSettings } = useEcommerce();

    // Form inputs state
    const [name, setName] = useState(contactInfo.name);
    const [email, setEmail] = useState(contactInfo.email);
    const [phone, setPhone] = useState(contactInfo.phone);
    const [isSaved, setIsSaved] = useState(false);

    // Mock Preferences state
    const [themeColor, setThemeColor] = useState('blue');
    const [currency, setCurrency] = useState('USD');
    const [language, setLanguage] = useState('English');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateContactInfo({ name, email, phone });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleToggleNotification = (key) => {
        updateNotificationSettings({
            [key]: !notificationSettings[key]
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-6 md:py-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => navigate('/profile')}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 border border-slate-100 transition-colors"
                    aria-label="Back to profile"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-900" />
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Settings</h1>
            </div>

            <div className="flex flex-col gap-8">
                
                {/* 1. Account Details Section */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-50">
                        <User className="w-5 h-5 text-blue-600" />
                        <h2 className="text-base font-bold text-slate-900">Account Details</h2>
                    </div>

                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                        {isSaved && (
                            <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-1.5 animate-fade-in">
                                <CheckCircle2 className="w-4 h-4" />
                                Account details updated successfully!
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="h-11 px-4 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-11 px-4 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-11 px-4 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md uppercase tracking-wider mt-2"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* 2. Notification Preferences Section */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-50">
                        <Bell className="w-5 h-5 text-blue-600" />
                        <h2 className="text-base font-bold text-slate-900">Notification Preferences</h2>
                    </div>

                    <div className="flex flex-col gap-5">
                        {/* Order Updates toggle */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">Order Updates</span>
                                <span className="text-xs text-slate-400">Receive texts and emails about your order status.</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleToggleNotification('orderUpdates')}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.orderUpdates ? 'bg-blue-600' : 'bg-slate-200'}`}
                            >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.orderUpdates ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* Promotions toggle */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">Promotions & Offers</span>
                                <span className="text-xs text-slate-400">Get notified when there are discounts or coupon events.</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleToggleNotification('promotions')}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.promotions ? 'bg-blue-600' : 'bg-slate-200'}`}
                            >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.promotions ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* Newsletters toggle */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">Weekly Newsletters</span>
                                <span className="text-xs text-slate-400">Get a recap of trending collections and hot drops.</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleToggleNotification('newsletters')}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.newsletters ? 'bg-blue-600' : 'bg-slate-200'}`}
                            >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.newsletters ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* SMS Alerts toggle */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">SMS Alerts</span>
                                <span className="text-xs text-slate-400">Get quick messages on your phone when items ship.</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleToggleNotification('smsAlerts')}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${notificationSettings.smsAlerts ? 'bg-blue-600' : 'bg-slate-200'}`}
                            >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${notificationSettings.smsAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. App Preferences Section */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-slate-50">
                        <Sliders className="w-5 h-5 text-blue-600" />
                        <h2 className="text-base font-bold text-slate-900">App Preferences</h2>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Theme Accent Color circles */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">Theme Accent</span>
                                <span className="text-xs text-slate-400">Customize the visual accents of the application.</span>
                            </div>
                            <div className="flex gap-2">
                                {['blue', 'slate', 'emerald', 'indigo'].map((color) => {
                                    const colorClasses = {
                                        blue: 'bg-blue-600',
                                        slate: 'bg-slate-800',
                                        emerald: 'bg-emerald-600',
                                        indigo: 'bg-indigo-600'
                                    };
                                    return (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setThemeColor(color)}
                                            className={`w-6 h-6 rounded-full ${colorClasses[color]} flex items-center justify-center transition-transform hover:scale-110 ${themeColor === color ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : ''}`}
                                            aria-label={`Select ${color} theme`}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Currency Select */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">Preferred Currency</span>
                                <span className="text-xs text-slate-400">Choose the currency symbol used on products.</span>
                            </div>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-bold focus:outline-none"
                            >
                                <option value="USD">USD ($)</option>
                                <option value="NGN">NGN (₦)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>

                        {/* Language Select */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">Language</span>
                                <span className="text-xs text-slate-400">Set the default localization of the interface.</span>
                            </div>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-bold focus:outline-none"
                            >
                                <option value="English">English</option>
                                <option value="French">Français</option>
                                <option value="Spanish">Español</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

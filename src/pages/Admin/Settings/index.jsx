import React, { useState, useEffect } from 'react';
import { 
    Save, 
    Store, 
    ShieldAlert, 
    MessageSquare, 
    CreditCard, 
    CheckCircle2, 
    Lock
} from 'lucide-react';
import mockDb from '../mockDb';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        storeName: '',
        supportEmail: '',
        currency: 'NGN (₦)',
        adminName: '',
        adminRole: '',
        bankName: '',
        accountNumber: '',
        accountName: '',
        whatsappEnabled: false,
        whatsappNumber: ''
    });

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const loaded = mockDb.getSettings();
        setSettings(loaded);
    }, []);

    const handleInputChange = (key, val) => {
        setSettings(prev => ({
            ...prev,
            [key]: val
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setErrorMsg('');
        setShowSuccess(false);

        // Password matching check
        if (password || confirmPassword) {
            if (password !== confirmPassword) {
                setErrorMsg('New passwords do not match.');
                setIsSaving(false);
                return;
            }
        }

        setTimeout(() => {
            mockDb.saveSettings(settings);
            setIsSaving(false);
            setShowSuccess(true);
            setPassword('');
            setConfirmPassword('');
            
            setTimeout(() => setShowSuccess(false), 3000);
        }, 600);
    };

    return (
        <form onSubmit={handleSave} className="flex flex-col gap-6 animate-fadeIn pb-16 select-none max-w-4xl">
            
            {/* Header Toast Messages */}
            {showSuccess && (
                <div className="flex items-center gap-2 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-bold animate-slideUp">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Configuration settings saved successfully.</span>
                </div>
            )}

            {errorMsg && (
                <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs font-bold animate-slideUp">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMsg}</span>
                </div>
            )}

            {/* Grid Layout containing settings panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* 1. Store Identity Panel */}
                <div className="bg-white border border-slate-100/60 rounded-xl p-5 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-slate-50">
                        <Store className="w-4 h-4 text-slate-400" />
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Store Identity</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Store Name</label>
                            <input
                                type="text"
                                required
                                value={settings.storeName}
                                onChange={(e) => handleInputChange('storeName', e.target.value)}
                                placeholder="e.g. Frank's Studio"
                                className="w-full h-10 px-3.5 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-800 focus:ring-1 focus:ring-slate-900 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Support Email Address</label>
                            <input
                                type="email"
                                required
                                value={settings.supportEmail}
                                onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                                placeholder="e.g. support@ecom.studio"
                                className="w-full h-10 px-3.5 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-800 focus:ring-1 focus:ring-slate-900 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. WhatsApp Support Panel */}
                <div className="bg-white border border-slate-100/60 rounded-xl p-5 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-50">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-slate-400" />
                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">WhatsApp Widget</h3>
                        </div>
                        
                        {/* Toggle Notch Switch */}
                        <button
                            type="button"
                            onClick={() => handleInputChange('whatsappEnabled', !settings.whatsappEnabled)}
                            className={`w-9 h-5 rounded-full transition-colors relative focus:outline-none cursor-pointer border-none ${
                                settings.whatsappEnabled ? 'bg-slate-950' : 'bg-slate-200'
                            }`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                    settings.whatsappEnabled ? 'translate-x-4' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp Phone Number</label>
                            <input
                                type="text"
                                disabled={!settings.whatsappEnabled}
                                value={settings.whatsappNumber}
                                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                                placeholder="e.g. +2348012345678"
                                className={`w-full h-10 px-3.5 border text-xs font-bold rounded-lg focus:outline-none transition-all ${
                                    settings.whatsappEnabled 
                                        ? 'border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 focus:border-slate-800 focus:ring-1 focus:ring-slate-900' 
                                        : 'border-slate-100 bg-slate-50/50 text-slate-350 cursor-not-allowed'
                                }`}
                            />
                            <p className="text-[9px] text-slate-400 font-semibold uppercase leading-tight mt-0.5">
                                Renders a floating chat bubble on the customer storefront.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Payout Details Panel */}
                <div className="bg-white border border-slate-100/60 rounded-xl p-5 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-slate-50">
                        <CreditCard className="w-4 h-4 text-slate-400" />
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Payout Bank Details</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Bank Name</label>
                            <select
                                value={settings.bankName}
                                onChange={(e) => handleInputChange('bankName', e.target.value)}
                                className="w-full h-10 px-3 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-800 focus:ring-1 focus:ring-slate-900 focus:outline-none transition-all"
                            >
                                <option value="">Select bank...</option>
                                <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
                                <option value="Access Bank">Access Bank</option>
                                <option value="Zenith Bank">Zenith Bank</option>
                                <option value="United Bank for Africa">United Bank for Africa</option>
                                <option value="Sterling Bank">Sterling Bank</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Account Number</label>
                            <input
                                type="text"
                                maxLength={10}
                                value={settings.accountNumber}
                                onChange={(e) => handleInputChange('accountNumber', e.target.value.replace(/\D/g, ''))}
                                placeholder="10-digit NUBAN number"
                                className="w-full h-10 px-3.5 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-800 focus:ring-1 focus:ring-slate-900 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Account Name</label>
                            <input
                                type="text"
                                value={settings.accountName}
                                onChange={(e) => handleInputChange('accountName', e.target.value)}
                                placeholder="e.g. Frank Ecom Studio"
                                className="w-full h-10 px-3.5 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-800 focus:ring-1 focus:ring-slate-900 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Account Security Panel */}
                <div className="bg-white border border-slate-100/60 rounded-xl p-5 flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-slate-50">
                        <Lock className="w-4 h-4 text-slate-400" />
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Security Profile</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Admin Name</label>
                            <input
                                type="text"
                                required
                                value={settings.adminName}
                                onChange={(e) => handleInputChange('adminName', e.target.value)}
                                className="w-full h-10 px-3.5 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-800 focus:ring-1 focus:ring-slate-900 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">System Role</label>
                            <input
                                type="text"
                                disabled
                                value={settings.adminRole}
                                className="w-full h-10 px-3.5 border border-slate-100 bg-slate-50 text-slate-400 text-xs font-bold rounded-lg focus:outline-none cursor-not-allowed"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-10 px-3.5 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-800 focus:ring-1 focus:ring-slate-900 focus:outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-10 px-3.5 border border-slate-200/80 bg-slate-50/20 focus:bg-white text-slate-800 text-xs font-bold rounded-lg focus:border-slate-800 focus:ring-1 focus:ring-slate-900 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Submit Row */}
            <div className="flex items-center justify-start mt-2">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="h-11 px-6 bg-slate-950 hover:bg-black text-white text-[11px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2.5 shadow-sm cursor-pointer disabled:bg-slate-700"
                >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Saving Configurations...' : 'Save Settings'}</span>
                </button>
            </div>

        </form>
    );
}

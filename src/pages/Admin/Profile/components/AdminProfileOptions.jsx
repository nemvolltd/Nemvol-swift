import React from 'react';
import { 
    ChevronRight, 
    Settings, 
    CreditCard, 
    Globe2, 
    Landmark, 
    Store, 
    Sliders, 
    ShieldCheck, 
    HelpCircle, 
    MessageSquare, 
    Globe,
    LogOut
} from 'lucide-react';

export default function AdminProfileOptions({
    onSettingsClick,
    onPlanClick,
    onDomainClick,
    onBankClick,
    storeEnabled,
    onToggleStore,
    onPreferencesClick,
    onPrivacyClick,
    onHelpClick,
    onFeedbackClick,
    systemLanguage,
    onLanguageClick,
    onLogoutClick
}) {
    return (
        <div className="flex flex-col gap-6">
            {/* ── List Group 1: General Core Options ── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-none overflow-hidden">
                
                {/* Option: Settings */}
                <button
                    onClick={onSettingsClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <Settings className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">Settings</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="h-px bg-slate-100 mx-4.5" />

                {/* Option: Plan & Subscription */}
                <button
                    onClick={onPlanClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <CreditCard className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">Plan & Subscription</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="h-px bg-slate-100 mx-4.5" />

                {/* Option: Domain Configuration */}
                <button
                    onClick={onDomainClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <Globe2 className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">Domain Configuration</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="h-px bg-slate-100 mx-4.5" />

                {/* Option: My Debit Cards & Linked Banks */}
                <button
                    onClick={onBankClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <Landmark className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">My Debit Cards & Linked Banks</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="h-px bg-slate-100 mx-4.5" />

                {/* Option: Enable Store (With Toggle Switch) */}
                <div className="w-full flex items-center justify-between p-4.5">
                    <div className="flex items-center gap-4">
                        <Store className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">Enable Store</span>
                    </div>
                    
                    {/* Custom Toggle Notch Switch */}
                    <button
                        type="button"
                        onClick={onToggleStore}
                        className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer border-none ${
                            storeEnabled ? 'bg-[#4ADE80]' : 'bg-slate-200'
                        }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                storeEnabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                    </button>
                </div>

            </div>

            {/* ── List Group 2: Preferences & Policies ── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-none overflow-hidden">
                
                {/* Option: Preferences */}
                <button
                    onClick={onPreferencesClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <Sliders className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">Preferences</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="h-px bg-slate-100 mx-4.5" />

                {/* Option: Privacy Policy */}
                <button
                    onClick={onPrivacyClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">Privacy Policy</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="h-px bg-slate-100 mx-4.5" />

                {/* Option: Help & Support */}
                <button
                    onClick={onHelpClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <HelpCircle className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">Help & Support</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                </button>

            </div>

            {/* ── List Group 3: Feedback & Localization ── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-none overflow-hidden">
                
                {/* Option: Feedback */}
                <button
                    onClick={onFeedbackClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <MessageSquare className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">Feedback</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="h-px bg-slate-100 mx-4.5" />

                {/* Option: Language */}
                <button
                    onClick={onLanguageClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-slate-50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <Globe className="w-5 h-5 text-slate-450 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-slate-700">Language</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs font-normal text-slate-400">{systemLanguage}</span>
                        <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                </button>

            </div>

            {/* ── List Group 4: Log Out ── */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-none overflow-hidden">
                <button
                    type="button"
                    onClick={onLogoutClick}
                    className="w-full flex items-center justify-between p-4.5 hover:bg-rose-50/50 transition-colors border-none text-left bg-transparent cursor-pointer group"
                >
                    <div className="flex items-center gap-4">
                        <LogOut className="w-5 h-5 text-rose-500 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] font-normal text-rose-600">Log Out</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-rose-350 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
}

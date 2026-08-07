import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import mockDb from '../mockDb';
import AccountUpdateModal from '../modal/AccountUpdateModal';
import { useAdminLogout } from '../../../hooks/useAuth';

// Import split subcomponents
import AdminProfileCard from './components/AdminProfileCard';
import AdminUpgradeBanner from './components/AdminUpgradeBanner';
import AdminProfileOptions from './components/AdminProfileOptions';
import {
    EditProfileModal,
    PlanModal,
    PreferencesModal,
    PrivacyModal,
    HelpModal,
    FeedbackModal,
    LanguageModal
} from './components/ProfileModals';
import DomainModal from './modals/DomainModal';

export default function AdminProfile() {
    const navigate = useNavigate();
    const { logout } = useAdminLogout();
    const [settings, setSettings] = useState({
        adminName: 'Salung',
        adminRole: 'Super Administrator',
        supportEmail: 'support@ecom.studio',
        bankName: 'Guaranty Trust Bank',
        accountNumber: '0123456789',
        accountName: 'Frank Ecom Studio'
    });

    // States for toggles and interactive options
    const [storeEnabled, setStoreEnabled] = useState(true);
    const [systemLanguage, setSystemLanguage] = useState('English');
    const [themePreference, setThemePreference] = useState('Light');
    const [emailNotifsEnabled, setEmailNotifsEnabled] = useState(true);

    // Modal view states
    const [modalState, setModalState] = useState({
        editProfile: false,
        plan: false,
        domain: false,
        bank: false,
        preferences: false,
        privacy: false,
        help: false,
        feedback: false,
        language: false
    });

    // Form inputs
    const [editForm, setEditForm] = useState({ name: '', email: '' });
    const [feedbackText, setFeedbackText] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        const loaded = mockDb.getSettings();
        if (loaded) {
            setSettings(prev => ({ ...prev, ...loaded }));
        }
        
        // Load store toggle preference
        const storedStoreEnabled = localStorage.getItem('admin_store_enabled');
        if (storedStoreEnabled !== null) {
            setStoreEnabled(storedStoreEnabled === 'true');
        }

        // Load language preference
        const storedLang = localStorage.getItem('admin_language');
        if (storedLang) {
            setSystemLanguage(storedLang);
        }

        // Load preferences
        const storedPrefs = localStorage.getItem('admin_prefs');
        if (storedPrefs) {
            const parsed = JSON.parse(storedPrefs);
            setThemePreference(parsed.theme || 'Light');
            setEmailNotifsEnabled(parsed.emailNotifs !== false);
        }
    }, []);

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };

    const toggleModal = (modalKey, isOpen) => {
        setModalState(prev => ({ ...prev, [modalKey]: isOpen }));
        
        // Initialize form fields when opening modals
        if (modalKey === 'editProfile' && isOpen) {
            setEditForm({
                name: settings.adminName || '',
                email: settings.supportEmail || ''
            });
        }
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        const updated = {
            ...settings,
            adminName: editForm.name,
            supportEmail: editForm.email
        };
        mockDb.saveSettings(updated);
        setSettings(updated);
        toggleModal('editProfile', false);
        triggerToast('Profile updated successfully');
    };

    const handleBankSave = (newAccountNum) => {
        const updated = {
            ...settings,
            accountNumber: newAccountNum
        };
        mockDb.saveSettings(updated);
        setSettings(updated);
        toggleModal('bank', false);
        triggerToast('Payout bank details updated');
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleToggleStore = () => {
        const newVal = !storeEnabled;
        setStoreEnabled(newVal);
        localStorage.setItem('admin_store_enabled', String(newVal));
        triggerToast(newVal ? 'Store is now Open' : 'Store is now Closed');
    };

    const handleSavePreferences = (e) => {
        e.preventDefault();
        const prefs = { theme: themePreference, emailNotifs: emailNotifsEnabled };
        localStorage.setItem('admin_prefs', JSON.stringify(prefs));
        toggleModal('preferences', false);
        triggerToast('Preferences saved');
    };

    const handleSelectLanguage = (lang) => {
        setSystemLanguage(lang);
        localStorage.setItem('admin_language', lang);
        toggleModal('language', false);
        triggerToast(`Language switched to ${lang}`);
    };

    const handleSubmitFeedback = (e) => {
        e.preventDefault();
        if (!feedbackText.trim()) return;
        
        const feedbackList = JSON.parse(localStorage.getItem('admin_feedback') || '[]');
        feedbackList.push({
            id: Date.now(),
            adminName: settings.adminName,
            feedback: feedbackText,
            date: new Date().toISOString()
        });
        localStorage.setItem('admin_feedback', JSON.stringify(feedbackList));
        
        setFeedbackText('');
        toggleModal('feedback', false);
        triggerToast('Thank you for your feedback!');
    };

    return (
        <div className="w-full max-w-md mx-auto bg-slate-50/70 min-h-screen pb-24 relative select-none">
            
            {/* ── Toast Alert Overlay ── */}
            {toast.show && (
                <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-2 px-4 py-3 rounded-full shadow-lg border text-xs font-bold animate-slideDown ${
                    toast.type === 'success' 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                        : 'bg-rose-50 border-rose-100 text-rose-800'
                }`}>
                    {toast.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{toast.message}</span>
                </div>
            )}

            <div className="pt-6 px-4 flex flex-col gap-6">
                
                {/* ── User Info Profile Card ── */}
                <AdminProfileCard 
                    name={settings.adminName}
                    email={settings.supportEmail}
                    onEditClick={() => toggleModal('editProfile', true)}
                />

                {/* ── Premium Upgrade to Pro Banner ── */}
                <AdminUpgradeBanner 
                    onUpgradeClick={() => toggleModal('plan', true)}
                />

                {/* ── List Group Options ── */}
                <AdminProfileOptions 
                    onSettingsClick={() => navigate('/admin/settings')}
                    onPlanClick={() => toggleModal('plan', true)}
                    onDomainClick={() => toggleModal('domain', true)}
                    onBankClick={() => toggleModal('bank', true)}
                    storeEnabled={storeEnabled}
                    onToggleStore={handleToggleStore}
                    onPreferencesClick={() => toggleModal('preferences', true)}
                    onPrivacyClick={() => toggleModal('privacy', true)}
                    onHelpClick={() => toggleModal('help', true)}
                    onFeedbackClick={() => toggleModal('feedback', true)}
                    systemLanguage={systemLanguage}
                    onLanguageClick={() => toggleModal('language', true)}
                    onLogoutClick={handleLogout}
                />

            </div>

            {/* ── Split Modals ── */}
            <EditProfileModal 
                isOpen={modalState.editProfile}
                onClose={() => toggleModal('editProfile', false)}
                editForm={editForm}
                setEditForm={setEditForm}
                onSave={handleSaveProfile}
            />

            <PlanModal 
                isOpen={modalState.plan}
                onClose={() => toggleModal('plan', false)}
                onManage={() => {
                    toggleModal('plan', false);
                    triggerToast('Plan is already managed by Enterprise agreement');
                }}
            />

            <DomainModal
                isOpen={modalState.domain}
                onClose={() => toggleModal('domain', false)}
                storeSlug={settings.adminName?.toLowerCase().replace(/\s+/g, '-') || 'my-store'}
            />

            {/* Payout Details Update Modal */}
            <AccountUpdateModal 
                isOpen={modalState.bank}
                onClose={() => toggleModal('bank', false)}
                currentValue={settings.accountNumber}
                onSave={handleBankSave}
            />

            <PreferencesModal 
                isOpen={modalState.preferences}
                onClose={() => toggleModal('preferences', false)}
                themePreference={themePreference}
                setThemePreference={setThemePreference}
                emailNotifsEnabled={emailNotifsEnabled}
                setEmailNotifsEnabled={setEmailNotifsEnabled}
                onSave={handleSavePreferences}
            />

            <PrivacyModal 
                isOpen={modalState.privacy}
                onClose={() => toggleModal('privacy', false)}
            />

            <HelpModal 
                isOpen={modalState.help}
                onClose={() => toggleModal('help', false)}
                onChat={() => {
                    toggleModal('help', false);
                    triggerToast('Opening direct support channel...');
                }}
            />

            <FeedbackModal 
                isOpen={modalState.feedback}
                onClose={() => toggleModal('feedback', false)}
                feedbackText={feedbackText}
                setFeedbackText={setFeedbackText}
                onSubmit={handleSubmitFeedback}
            />

            <LanguageModal 
                isOpen={modalState.language}
                onClose={() => toggleModal('language', false)}
                systemLanguage={systemLanguage}
                onSelectLanguage={handleSelectLanguage}
            />

        </div>
    );
}

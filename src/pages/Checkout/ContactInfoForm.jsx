import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function ContactInfoForm({ contactInfo, onInfoChange }) {
    const handleChange = (field, value) => {
        onInfoChange({ [field]: value });
    };

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Contact Info</h2>

            <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-slate-500">Name</label>
                    <input
                        type="text"
                        value={contactInfo.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-slate-500">Email</label>
                    <input
                        type="email"
                        value={contactInfo.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full h-12 px-4 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-slate-500">Phone Number</label>
                    <div className="flex h-12 border border-slate-200 rounded-lg overflow-hidden focus-within:border-slate-400">
                        <div className="flex items-center gap-1 px-3 bg-white border-r border-slate-200 cursor-pointer">
                            <span className="text-sm text-slate-600 font-medium">{contactInfo.countryCode || 'NGN'}</span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
                            type="tel"
                            value={contactInfo.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="flex-1 px-4 text-sm text-slate-900 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

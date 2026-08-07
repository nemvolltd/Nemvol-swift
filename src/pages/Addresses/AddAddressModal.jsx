import React, { useState, useEffect } from 'react';
import { X, Check, MapPin, Home, Briefcase } from 'lucide-react';

const LABEL_PRESETS = ['Home', 'Office', 'Other'];

export default function AddAddressModal({ isOpen, address, onClose, onSave }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('Nigeria');
    const [isDefault, setIsDefault] = useState(false);

    useEffect(() => {
        if (address) {
            setName(address.name || '');
            setPhone(address.phone || '');
            setStreet(address.street || '');
            setCity(address.city || '');
            setState(address.state || '');
            setCountry(address.country || 'Nigeria');
            setIsDefault(address.isDefault || false);
        } else {
            setName('');
            setPhone('');
            setStreet('');
            setCity('');
            setState('');
            setCountry('Nigeria');
            setIsDefault(false);
        }
    }, [address, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !phone || !street || !city || !state) {
            alert('Please fill out all required fields.');
            return;
        }
        onSave({ name, phone, street, city, state, country, isDefault });
    };

    const inputCls = "w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500 focus:bg-white transition-all placeholder:text-slate-350 placeholder:font-medium";
    const labelCls = "text-[10px] font-black text-slate-450 uppercase tracking-wider";

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
                {/* Drag handle (mobile) */}
                <div className="sm:hidden flex justify-center pt-3 pb-1">
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-orange-500" />
                        </div>
                        <h3 className="text-sm font-black text-slate-900">
                            {address ? 'Edit Address' : 'New Address'}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer border-none bg-transparent"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 min-h-0 overflow-y-auto px-6 pt-5 pb-6 flex flex-col gap-4">

                    {/* Label Quick Select */}
                    <div className="flex flex-col gap-2">
                        <label className={labelCls}>Address Label</label>
                        <div className="flex gap-2">
                            {LABEL_PRESETS.map(preset => {
                                const Icon = preset === 'Home' ? Home : preset === 'Office' ? Briefcase : MapPin;
                                const active = name === preset;
                                return (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => setName(preset)}
                                        className={`flex-1 h-10 flex items-center justify-center gap-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                                            active
                                                ? 'bg-orange-500 border-orange-500 text-white shadow-[0_4px_12px_rgba(249,115,22,0.25)]'
                                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-orange-300 hover:text-orange-500'
                                        }`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        {preset}
                                    </button>
                                );
                            })}
                        </div>
                        {/* Custom label input fallback */}
                        {!LABEL_PRESETS.includes(name) && (
                            <input
                                type="text"
                                placeholder="Custom label…"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className={inputCls}
                            />
                        )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+234 903 382 7682"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className={inputCls}
                            required
                        />
                    </div>

                    {/* Street */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Street Address</label>
                        <input
                            type="text"
                            placeholder="e.g. 57 Spring Avenue, Lekki"
                            value={street}
                            onChange={e => setStreet(e.target.value)}
                            className={inputCls}
                            required
                        />
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className={labelCls}>City</label>
                            <input
                                type="text"
                                placeholder="e.g. Ikeja"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                className={inputCls}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className={labelCls}>State</label>
                            <input
                                type="text"
                                placeholder="e.g. Lagos"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                className={inputCls}
                                required
                            />
                        </div>
                    </div>

                    {/* Country */}
                    <div className="flex flex-col gap-1.5">
                        <label className={labelCls}>Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            className={inputCls}
                        />
                    </div>

                    {/* Set Default Toggle */}
                    <div
                        className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl cursor-pointer select-none hover:bg-slate-100 transition-colors"
                        onClick={() => setIsDefault(!isDefault)}
                    >
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 transition-all ${
                            isDefault ? 'bg-orange-500 border-orange-500' : 'border-slate-300 bg-white'
                        }`}>
                            {isDefault && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-800">Set as Default Address</span>
                            <span className="text-[10px] text-slate-400">Use this address for all future orders</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer border-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_16px_rgba(249,115,22,0.30)] cursor-pointer border-none"
                        >
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

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
            alert('Please fill out all fields.');
            return;
        }
        onSave({
            name,
            phone,
            street,
            city,
            state,
            country,
            isDefault
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[75vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                        {address ? 'Edit Address' : 'Add New Address'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-3.5">
                    {/* Address Name (e.g. Home, Office) */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Address Label</label>
                        <input
                            type="text"
                            placeholder="e.g. Home, Office"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-10 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+234 903 382 7682"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-10 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Street */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Street Address</label>
                        <input
                            type="text"
                            placeholder="e.g. 57th Spring Avenue"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className="w-full h-10 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* City & State */}
                    <div className="flex gap-3">
                        <div className="flex-1 flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">City</label>
                            <input
                                type="text"
                                placeholder="e.g. Ikeja"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-10 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">State</label>
                            <input
                                type="text"
                                placeholder="e.g. Lagos"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full h-10 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                            />
                        </div>
                    </div>

                    {/* Country */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full h-10 px-3.5 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                    </div>

                    {/* Default Checkbox */}
                    <div
                        className="flex items-center gap-2.5 mt-1 cursor-pointer select-none"
                        onClick={() => setIsDefault(!isDefault)}
                    >
                        <div className={`w-4.5 h-4.5 rounded-lg flex items-center justify-center border transition-colors ${isDefault ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-slate-50'
                            }`}>
                            {isDefault && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </div>
                        <span className="text-[11px] font-bold text-slate-600">Set as Default Address</span>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center gap-2.5 mt-2 py-2 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-9.5 sm:h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 h-9.5 sm:h-10 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/10"
                        >
                            Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

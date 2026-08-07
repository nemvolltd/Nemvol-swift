import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function StatusDropdown({ status, onChange, onOpen, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                if (onClose) onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    const getStatusTheme = (s) => {
        switch (s) {
            case 'Processing':
                return { textClass: 'text-amber-600', dot: 'bg-amber-500' };
            case 'Shipped':
                return { textClass: 'text-blue-600', dot: 'bg-blue-500' };
            case 'Delivered':
                return { textClass: 'text-emerald-600', dot: 'bg-emerald-500' };
            case 'Cancelled':
                return { textClass: 'text-rose-600', dot: 'bg-rose-500' };
            default:
                return { textClass: 'text-slate-600', dot: 'bg-slate-450' };
        }
    };

    const currentTheme = getStatusTheme(status);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left select-none">
            <button
                type="button"
                onClick={() => {
                    const nextOpen = !isOpen;
                    setIsOpen(nextOpen);
                    if (nextOpen && onOpen) onOpen();
                    if (!nextOpen && onClose) onClose();
                }}
                className="text-[10px] font-extrabold uppercase tracking-wider border border-slate-200/80 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg cursor-pointer transition-all flex items-center justify-between gap-2 shadow-sm text-slate-700"
            >
                <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot}`}></span>
                    <span className={currentTheme.textClass}>{status}</span>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-white border border-slate-100 shadow-xl py-1.5 z-50 focus:outline-none animate-fadeIn">
                    {statuses.map((s) => {
                        const theme = getStatusTheme(s);
                        const isSelected = s === status;
                        return (
                            <button
                                type="button"
                                key={s}
                                onClick={() => {
                                    onChange(s);
                                    setIsOpen(false);
                                    if (onClose) onClose();
                                }}
                                className={`w-full flex items-center justify-between px-3.5 py-2 text-[11px] font-bold transition-colors hover:bg-slate-50 cursor-pointer ${
                                    isSelected ? 'text-black bg-slate-50/50' : 'text-slate-650'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`}></span>
                                    <span>{s}</span>
                                </div>
                                {isSelected && <Check className="w-3 h-3 text-black" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

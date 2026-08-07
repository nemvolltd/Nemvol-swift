import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function AdminProfileCard({ name, email, onEditClick }) {
    return (
        <div 
            onClick={onEditClick}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 flex items-center gap-4 hover:bg-slate-50 transition-all cursor-pointer group"
        >
            {/* Yellow avatar matching mockup illustration */}
            <div className="w-12 h-12 rounded-full bg-[#FCD34D] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                {/* Custom SVG Avatar resembling the cute character in the mockup */}
                <svg className="w-8 h-8 text-slate-800 mt-1.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0 2c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
                </svg>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[15px] font-semibold text-slate-800 truncate leading-tight">
                    {name}
                </span>
                <span className="text-xs text-slate-400 truncate mt-1 font-normal">
                    {email}
                </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-350 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </div>
    );
}

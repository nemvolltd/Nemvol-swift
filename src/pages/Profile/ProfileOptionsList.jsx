import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function ProfileOptionsList({ options }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
            {options.map((option, index) => (
                <Link
                    key={option.id}
                    to={option.link}
                    className={`flex items-center justify-between p-5 hover:bg-slate-50 transition-colors ${index !== options.length - 1 ? 'border-b border-slate-100' : ''
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                            <option.icon className="w-5 h-5 text-slate-600" />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{option.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                </Link>
            ))}
        </div>
    );
}

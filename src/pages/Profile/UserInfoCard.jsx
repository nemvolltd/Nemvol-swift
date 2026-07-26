import React from 'react';
import { User } from 'lucide-react';

export default function UserInfoCard({ name, email }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-slate-400" />
            </div>
            <div className="flex flex-col">
                <h2 className="text-lg font-bold text-slate-900">{name}</h2>
                <p className="text-sm text-slate-500">{email}</p>
            </div>
            <button className="ml-auto text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Edit
            </button>
        </div>
    );
}

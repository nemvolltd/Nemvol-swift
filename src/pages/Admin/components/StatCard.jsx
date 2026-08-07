import React from 'react';

const SCHEMES = {
    blue: {
        text: 'text-blue-600',
        iconBg: 'bg-blue-50 text-blue-600',
        glow: 'hover:shadow-blue-500/5 hover:border-blue-200',
    },
    indigo: {
        text: 'text-indigo-600',
        iconBg: 'bg-indigo-50 text-indigo-600',
        glow: 'hover:shadow-indigo-500/5 hover:border-indigo-200',
    },
    amber: {
        text: 'text-amber-600',
        iconBg: 'bg-amber-50 text-amber-600',
        glow: 'hover:shadow-amber-500/5 hover:border-amber-200',
    },
    emerald: {
        text: 'text-emerald-600',
        iconBg: 'bg-emerald-50 text-emerald-600',
        glow: 'hover:shadow-emerald-500/5 hover:border-emerald-200',
    },
    slate: {
        text: 'text-slate-600',
        iconBg: 'bg-slate-50 text-slate-600',
        glow: 'hover:shadow-slate-500/5 hover:border-slate-350',
    }
};

export default function StatCard({ label, value, trend, icon: Icon, colorScheme = 'blue' }) {
    const scheme = SCHEMES[colorScheme] || SCHEMES.blue;

    return (
        <div className={`bg-white border border-slate-100/90 rounded-2xl p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group ${scheme.glow}`}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-400 uppercase">{label}</span>
                {Icon && (
                    <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center transition-colors duration-300 ${scheme.iconBg}`}>
                        <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />
                    </div>
                )}
            </div>
            
            <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-none">{value}</h3>
                {trend && (
                    <div className="flex items-center gap-1.5 mt-3">
                        <span className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full ${
                            trend.type === 'up' 
                                ? 'bg-emerald-50 text-emerald-600' 
                                : 'bg-rose-50 text-rose-600'
                        }`}>
                            {trend.value}
                        </span>
                        <span className="text-[10px] md:text-xs font-medium text-slate-400">
                            {trend.label}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}


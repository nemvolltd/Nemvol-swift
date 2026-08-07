import React from 'react';

export default function PageHeader({ title, subtitle, action }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">{title}</h1>
                {subtitle && <p className="text-xs text-slate-500 font-medium mt-1 md:text-sm">{subtitle}</p>}
            </div>
            {action && <div className="flex items-center gap-3">{action}</div>}
        </div>
    );
}

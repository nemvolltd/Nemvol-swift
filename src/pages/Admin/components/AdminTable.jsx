import React from 'react';

export default function AdminTable({ columns = [], rows = [], isLoading = false, emptyMessage = 'No items found.' }) {
    if (isLoading) {
        return (
            <div className="bg-white border border-slate-100 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <div className="w-8 h-8 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Loading details...</p>
            </div>
        );
    }

    if (rows.length === 0) {
        return (
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <p className="text-sm font-semibold text-slate-400">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-wider"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rows.map((row, idx) => (
                            <tr key={row.id || idx} className="hover:bg-slate-50/30 transition-colors">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-6 py-4.5 text-xs text-slate-700 font-medium">
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import React from 'react';
import { Check } from 'lucide-react';

export default function DeliveryMethodSelector({ selectedMethod, onSelectMethod }) {
    const methods = [
        {
            id: 'standard',
            title: 'Standard',
            duration: '(5-7 Days)',
            cost: 50
        },
        {
            id: 'express',
            title: 'Express',
            duration: '(2-3 Days)',
            cost: 100
        }
    ];

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Delivery Method</h2>

            <div className="flex flex-col gap-3">
                {methods.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    return (
                        <div
                            key={method.id}
                            onClick={() => onSelectMethod(method.id)}
                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${isSelected
                                    ? 'border-orange-300 bg-orange-50/30'
                                    : 'border-slate-100 hover:border-slate-200'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-orange-500 border-orange-500' : 'border-slate-200 bg-slate-50'
                                    }`}>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-bold text-slate-900">{method.title}</span>
                                    <span className="text-xs text-slate-500">{method.duration}</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-slate-900">${method.cost}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

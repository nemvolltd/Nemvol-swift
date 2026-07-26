import React from 'react';
import { Check } from 'lucide-react';

export default function PaymentOptionSelector({ selectedOption, onSelectOption }) {
    const options = [
        {
            id: 'pay_on_delivery',
            title: 'Pay on Delivery',
            description: null
        },
        {
            id: 'pay_before',
            title: 'Pay before Delivery',
            description: null
        },
        {
            id: 'split',
            title: 'Split Payment',
            description: '[only with stripe]'
        }
    ];

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Payment Option</h3>

            <div className="flex flex-col gap-3">
                {options.map((option) => {
                    const isSelected = selectedOption === option.id;
                    return (
                        <div
                            key={option.id}
                            onClick={() => onSelectOption(option.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isSelected
                                ? 'border-blue-300 bg-blue-50/30'
                                : 'border-slate-100 hover:border-slate-200'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-slate-50'
                                }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-slate-900">{option.title}</span>
                                {option.description && (
                                    <span className="text-xs text-slate-400 font-medium">{option.description}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

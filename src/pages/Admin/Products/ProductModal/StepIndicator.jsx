import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
    { id: 1, label: 'Info & Media' },
    { id: 2, label: 'Attributes' },
    { id: 3, label: 'Pricing & Stock' }
];

export default function StepIndicator({ currentStep, onStepClick }) {
    return (
        <div className="flex items-center justify-between w-full px-4 sm:px-6 py-3 bg-slate-50/80 border-b border-slate-100/80 backdrop-blur-xs select-none">
            {STEPS.map((step, idx) => {
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;

                return (
                    <React.Fragment key={step.id}>
                        <button
                            type="button"
                            onClick={() => onStepClick && onStepClick(step.id)}
                            className="flex items-center gap-2 group cursor-pointer border-none bg-transparent"
                        >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                                isCompleted
                                    ? 'bg-emerald-500 text-white shadow-sm'
                                    : isActive
                                        ? 'bg-slate-900 text-white ring-4 ring-slate-900/10 scale-105 shadow-sm'
                                        : 'bg-slate-200/80 text-slate-500 group-hover:bg-slate-300'
                            }`}>
                                {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.id}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wider transition-colors ${
                                isActive ? 'text-slate-900' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                            }`}>
                                <span className="hidden sm:inline">{step.label}</span>
                                <span className="sm:hidden">{step.label.split(' ')[0]}</span>
                            </span>
                        </button>

                        {idx < STEPS.length - 1 && (
                            <div className={`flex-1 h-[2px] mx-2 sm:mx-3 rounded-full transition-colors ${
                                currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-200/80'
                            }`} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

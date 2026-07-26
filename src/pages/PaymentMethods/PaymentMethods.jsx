import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, CheckCircle2, CreditCard, Plus } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import AddCardModal from './AddCardModal';

export default function PaymentMethods() {
    const navigate = useNavigate();
    const { paymentCards, addPaymentCard, deletePaymentCard, setDefaultPaymentCard } = useEcommerce();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-6 md:py-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button
                    onClick={() => navigate('/profile')}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 border border-slate-100 transition-colors"
                    aria-label="Back to profile"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-900" />
                </button>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Payment Methods</h1>
            </div>

            {/* List & Cards */}
            <div className="flex flex-col gap-6">
                {paymentCards.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {paymentCards.map((card) => (
                            <div
                                key={card.id}
                                className={`relative rounded-2xl p-5 text-white flex flex-col justify-between aspect-[1.58/1] shadow-md transition-all duration-300 overflow-hidden ${card.isDefault
                                    ? 'bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-800 scale-100 shadow-blue-600/10'
                                    : 'bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-900 opacity-90 hover:opacity-100'
                                    }`}
                            >
                                {/* Decorative rings inside card background */}
                                <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-white/5 border border-white/5 pointer-events-none" />

                                <div className="flex justify-between items-start">
                                    <CreditCard className="w-7 h-7 opacity-85" strokeWidth={1.5} />
                                    <div className="flex items-center gap-2">
                                        {card.isDefault && (
                                            <span className="bg-white/20 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
                                                <CheckCircle2 className="w-2.5 h-2.5" />
                                                Default
                                            </span>
                                        )}
                                        {card.brand === 'Visa' ? (
                                            <span className="text-base font-black italic tracking-widest text-white/95">VISA</span>
                                        ) : (
                                            <div className="flex gap-1 items-center">
                                                <div className="w-4 h-4 rounded-full bg-red-500/90" />
                                                <div className="w-4 h-4 rounded-full bg-amber-500/90 -ml-2.5" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="my-4">
                                    <span className="text-base md:text-lg font-mono tracking-widest block opacity-95">
                                        {card.number.replace(/\d(?=\d{4})/g, "•")}
                                    </span>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[9px] uppercase tracking-wider text-white/60">Card Holder</span>
                                        <span className="text-xs font-bold tracking-wide uppercase line-clamp-1 max-w-[150px]">
                                            {card.holder}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-0.5 text-right">
                                        <span className="text-[9px] uppercase tracking-wider text-white/60">Expires</span>
                                        <span className="text-xs font-bold tracking-wide font-mono">
                                            {card.expiry}
                                        </span>
                                    </div>
                                </div>

                                {/* Overlay Hover Controls */}
                                <div className="absolute inset-0 bg-slate-900/95 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 p-4 z-10">
                                    {!card.isDefault && (
                                        <button
                                            onClick={() => setDefaultPaymentCard(card.id)}
                                            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-1"
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Set Default
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deletePaymentCard(card.id)}
                                        className="w-10 h-10 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl flex items-center justify-center transition-colors"
                                        aria-label="Delete card"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <CreditCard className="w-12 h-12 text-slate-400 mx-auto mb-3" strokeWidth={1.5} />
                        <h3 className="text-sm font-bold text-slate-900 mb-1">No Saved Cards</h3>
                        <p className="text-xs text-slate-400 mb-4">Add a debit or credit card to checkout faster next time.</p>
                    </div>
                )}

                {/* Add Card Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full h-14 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-900 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    <Plus className="w-4 h-4 text-blue-600" />
                    Add Payment Method
                </button>
            </div>

            {/* Modal */}
            <AddCardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={addPaymentCard}
            />
        </div>
    );
}

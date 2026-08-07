import React, { useState } from 'react';
import { Check, Plus, CreditCard } from 'lucide-react';
import { usePaymentCards, useAddCard, useSetDefaultCard } from '../../hooks/usePaymentCards';
import AddCardModal from '../../pages/PaymentMethods/AddCardModal';

export default function DebitCardForm() {
    const { data: paymentCards = [] } = usePaymentCards();
    const { mutate: addPaymentCard } = useAddCard();
    const { mutate: setDefaultPaymentCard } = useSetDefaultCard();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <h3 className="text-sm font-bold text-slate-900">Saved Cards</h3>
                <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add Card
                </button>
            </div>

            {paymentCards.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {paymentCards.map((card) => {
                        const isSelected = card.isDefault;
                        return (
                            <div
                                key={card.id}
                                onClick={() => setDefaultPaymentCard(card.id)}
                                className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${isSelected
                                    ? 'border-blue-600 bg-blue-50/20 shadow-sm shadow-blue-600/5'
                                    : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-7 rounded-md bg-slate-100 flex items-center justify-center border border-slate-200/50">
                                        {card.brand === 'Visa' ? (
                                            <span className="text-[10px] font-black italic tracking-widest text-blue-600">VISA</span>
                                        ) : (
                                            <div className="flex gap-0.5">
                                                <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                                                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 -ml-2" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-900">
                                            {card.brand} •••• {card.number.slice(-4)}
                                        </span>
                                        <span className="text-[10px] text-slate-400">Expires {card.expiry}</span>
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${isSelected
                                    ? 'bg-blue-600 border-blue-600'
                                    : 'border-slate-200 bg-white'
                                    }`}>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 cursor-pointer hover:bg-slate-100/50 transition-colors"
                >
                    <CreditCard className="w-8 h-8 text-slate-400 mx-auto mb-2" strokeWidth={1.5} />
                    <h3 className="text-xs font-bold text-slate-900 mb-0.5">No Saved Cards</h3>
                    <p className="text-[10px] text-slate-400 mb-2">Click to save a card and checkout instantly.</p>
                </div>
            )}

            {/* inline modal trigger */}
            <AddCardModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={addPaymentCard}
            />
        </div>
    );
}

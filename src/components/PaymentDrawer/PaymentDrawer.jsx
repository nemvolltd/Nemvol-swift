import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import useStore from '../../store/useStore';
import DebitCardForm from './DebitCardForm';
import PaymentOptionSelector from './PaymentOptionSelector';

export default function PaymentDrawer({ isOpen, onClose }) {
    const navigate = useNavigate();
    const paymentMethod = useStore((s) => s.paymentMethod);
    const setPaymentMethod = useStore((s) => s.setPaymentMethod);

    const handleReviewDetails = () => {
        onClose();
        navigate('/review');
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer (Slide up from bottom) */}
            <div
                className={`fixed bottom-0 left-0 right-0 w-full max-w-5xl mx-auto bg-slate-50 rounded-t-3xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)] max-h-[90vh] ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {/* Drawer Handle */}
                <div className="w-full flex justify-center pt-3 pb-1">
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-white rounded-t-3xl">
                    <h2 className="text-base font-bold text-slate-900">Payment Method</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-slate-400 hover:text-slate-900 transition-colors"
                        aria-label="Close payment selector"
                    >
                        <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 py-6 hide-scrollbar flex flex-col md:flex-row gap-6 md:gap-8">
                    
                    {/* Left Column: Debit Card Section */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <DebitCardForm />
                    </div>

                    {/* Right Column: Payment Option Section */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <PaymentOptionSelector 
                            selectedOption={paymentMethod} 
                            onSelectOption={setPaymentMethod} 
                        />

                        {/* Desktop Review Details Button (Inline) */}
                        <div className="hidden md:block mt-4">
                            <button
                                onClick={handleReviewDetails}
                                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/10"
                            >
                                Review Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Review Details Button */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 pb-safe md:hidden">
                    <button
                        onClick={handleReviewDetails}
                        className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/10"
                    >
                        Review Details
                    </button>
                </div>
            </div>
        </>
    );
}

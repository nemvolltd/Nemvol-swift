import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Headphones } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import ContactInfoForm from './ContactInfoForm';
import DeliveryAddressSummary from './DeliveryAddressSummary';
import DeliveryMethodSelector from './DeliveryMethodSelector';
import PaymentDrawer from '../../components/PaymentDrawer/PaymentDrawer';

export default function Checkout() {
    const navigate = useNavigate();
    const {
        contactInfo,
        updateContactInfo,
        addresses,
        activeAddressId,
        deliveryMethod,
        updateDeliveryMethod
    } = useEcommerce();

    const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);

    // Find the currently active shipping address
    const activeAddress = addresses.find(a => a.id === activeAddressId) || addresses[0];

    return (
        <div className="w-full max-w-5xl mx-auto bg-slate-50 min-h-screen flex flex-col pb-24 md:pb-10">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-4 sticky top-0 bg-slate-50 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-50 transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-900" />
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="text-base font-bold text-slate-900">Checkout</h1>
                    {/* Progress Indicator */}
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-4 h-1 bg-blue-600 rounded-full"></div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    </div>
                </div>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-50 transition-colors" aria-label="Support">
                    <Headphones className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
                </button>
            </div>

            <div className="px-4 mt-4 flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Left Column: Contact and Shipping Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <ContactInfoForm 
                        contactInfo={contactInfo} 
                        onInfoChange={updateContactInfo} 
                    />

                    <DeliveryAddressSummary address={activeAddress} />
                </div>

                {/* Right Column: Shipping Mode and Navigation Buttons */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <DeliveryMethodSelector 
                        selectedMethod={deliveryMethod} 
                        onSelectMethod={updateDeliveryMethod} 
                    />

                    {/* Desktop Continue Button (Inline) */}
                    <div className="hidden md:block mt-4">
                        <button
                            onClick={() => setIsPaymentDrawerOpen(true)}
                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/10"
                        >
                            Continue to Payment method
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Continue Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-50 md:hidden z-20 border-t border-slate-100">
                <button
                    onClick={() => setIsPaymentDrawerOpen(true)}
                    className="w-full max-w-3xl mx-auto h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/10"
                >
                    Continue to Payment method
                </button>
            </div>

            {/* Payment Slide-up Drawer */}
            <PaymentDrawer
                isOpen={isPaymentDrawerOpen}
                onClose={() => setIsPaymentDrawerOpen(false)}
            />
        </div>
    );
}

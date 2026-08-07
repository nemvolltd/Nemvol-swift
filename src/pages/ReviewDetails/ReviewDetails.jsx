import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Headphones, MapPin, CreditCard, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { usePlaceOrder } from '../../hooks/useOrders';
import { useAddresses } from '../../hooks/useAddresses';
import { usePaymentCards } from '../../hooks/usePaymentCards';
import useStore from '../../store/useStore';
import OrderItemsList from './OrderItemsList';
import CheckoutSummary from './CheckoutSummary';

export default function ReviewDetails() {
    const navigate = useNavigate();
    const { data: cart = [] } = useCart();
    const { data: addresses = [] } = useAddresses();
    const { data: paymentCards = [] } = usePaymentCards();
    const { mutateAsync: placeOrder, isPending: isSubmittingCheckout } = usePlaceOrder();
    const deliveryMethod = useStore((s) => s.deliveryMethod);
    const paymentMethod = useStore((s) => s.paymentMethod);
    const activeAddressId = useStore((s) => s.activeAddressId);

    // Selected cart items
    const selectedItems = cart.filter(item => item.selected);

    // Shipping Address
    const activeAddress = addresses.find(a => a.id === activeAddressId) || addresses[0];
    const addressString = activeAddress
        ? `${activeAddress.street}, ${activeAddress.city}, ${activeAddress.state}, ${activeAddress.country}.`
        : 'No shipping address set.';

    // Payment string
    const defaultCard = paymentCards.find(c => c.isDefault);
    const paymentString = paymentMethod === 'pay_on_delivery'
        ? 'Pay on Delivery'
        : paymentMethod === 'split'
            ? 'Split Payment (Stripe)'
            : defaultCard
                ? `Debit Card •••• ${defaultCard.number.slice(-4)}`
                : 'No payment method selected';

    // Delivery display
    const deliveryLabel = deliveryMethod === 'express' ? 'Express Delivery (1–2 days)' : 'Standard Delivery (3–5 days)';

    // Totals
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const deliveryFee = deliveryMethod === 'express' ? 1500 : 500;
    const tax = selectedItems.length > 0 ? 250 : 0;
    const total = subtotal + deliveryFee + tax;

    const handleConfirmOrder = async () => {
        if (selectedItems.length === 0) {
            alert('Your cart has no selected items to purchase.');
            return;
        }
        try {
            const newOrder = await placeOrder({
                items: selectedItems,
                shippingAddress: activeAddress,
                paymentMethod,
                deliveryMethod,
                subtotal,
                deliveryFee,
                tax,
                total,
            });
            if (newOrder) {
                navigate('/success', { state: { order: newOrder } });
            }
        } catch (err) {
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-slate-50/60 min-h-screen flex flex-col pb-32 md:pb-12">

            {/* ── Topbar ── */}
            <div className="flex items-center justify-between px-5 py-4 sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-none"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-4 h-4 text-slate-800" strokeWidth={2.2} />
                </button>

                <div className="flex flex-col items-center gap-1.5">
                    <h1 className="text-sm font-black text-slate-900">Review Details</h1>
                    {/* Step dots */}
                    <div className="flex items-center gap-1.5">
                        <div className="w-5 h-1.5 bg-orange-500 rounded-full" />
                        <div className="w-5 h-1.5 bg-orange-500 rounded-full" />
                        <div className="w-2.5 h-1.5 bg-slate-200 rounded-full" />
                    </div>
                </div>

                <button
                    onClick={() => navigate('/help')}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-none"
                    aria-label="Support"
                >
                    <Headphones className="w-4 h-4 text-slate-800" strokeWidth={1.8} />
                </button>
            </div>

            {/* ── Body ── */}
            <div className="px-4 md:px-8 mt-5 flex flex-col md:flex-row gap-4 md:gap-6">

                {/* Left column */}
                <div className="w-full md:w-[55%] flex flex-col gap-4">

                    {/* Order Items */}
                    <OrderItemsList items={selectedItems} />

                    {/* Shipping & Payment Info Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden">
                        <div className="px-5 pt-5 pb-3 border-b border-slate-50">
                            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">Delivery & Payment</h2>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {/* Shipping Address */}
                            <div
                                onClick={() => navigate('/checkout')}
                                className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-orange-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                        Shipping Address
                                    </span>
                                    <p className="text-xs font-bold text-slate-800 truncate">{addressString}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                            </div>

                            {/* Delivery Method */}
                            <div className="flex items-center gap-4 px-5 py-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                    <Truck className="w-4 h-4 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                        Delivery Method
                                    </span>
                                    <p className="text-xs font-bold text-slate-800">{deliveryLabel}</p>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div
                                onClick={() => navigate('/checkout')}
                                className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                                    <CreditCard className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                                        Payment Method
                                    </span>
                                    <p className="text-xs font-bold text-slate-800">{paymentString}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="w-full md:w-[45%] flex flex-col gap-4">
                    <CheckoutSummary
                        subtotal={subtotal}
                        deliveryFee={deliveryFee}
                        tax={tax}
                        total={total}
                        onConfirm={handleConfirmOrder}
                        isLoading={isSubmittingCheckout}
                    />
                </div>
            </div>

            {/* ── Mobile Sticky Confirm Bar ── */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-5 pt-3 pb-6 z-20">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-slate-500 font-medium">Total Amount</span>
                    <span className="text-base font-black text-orange-500">₦{total.toLocaleString()}</span>
                </div>
                <button
                    onClick={handleConfirmOrder}
                    disabled={isSubmittingCheckout}
                    className={`w-full h-13 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-2xl transition-all flex items-center justify-center shadow-[0_4px_16px_rgba(249,115,22,0.30)] border-none cursor-pointer ${
                        isSubmittingCheckout ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmittingCheckout ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                        </span>
                    ) : (
                        'Confirm Order'
                    )}
                </button>
            </div>
        </div>
    );
}

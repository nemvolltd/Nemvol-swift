import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Headphones } from 'lucide-react';
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

    // Get selected cart items
    const selectedItems = cart.filter(item => item.selected);

    // Shipping Address
    const activeAddress = addresses.find(a => a.id === activeAddressId) || addresses[0];
    const addressString = activeAddress
        ? `${activeAddress.street}, ${activeAddress.city}, ${activeAddress.state}, ${activeAddress.country}.`
        : 'No shipping address set.';

    // Payment method string
    const defaultCard = paymentCards.find(c => c.isDefault);
    const paymentString = paymentMethod === 'pay_on_delivery'
        ? 'Pay on Delivery'
        : paymentMethod === 'split'
            ? 'Split Payment (Stripe)'
            : defaultCard
                ? `Debit Card (**** ${defaultCard.number.slice(-4)})`
                : 'No payment method selected';

    // Totals calculations
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const deliveryFee = deliveryMethod === 'express' ? 100.00 : 50.00;
    const tax = selectedItems.length > 0 ? 5.00 : 0.00;
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
            alert('Failed to place order.');
        }
    };

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
                    <h1 className="text-base font-bold text-slate-900">Review Details</h1>
                    {/* Progress Indicator */}
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-4 h-1 bg-blue-600 rounded-full"></div>
                        <div className="w-4 h-1 bg-blue-600 rounded-full"></div>
                    </div>
                </div>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-slate-50 transition-colors" aria-label="Support">
                    <Headphones className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
                </button>
            </div>

            <div className="px-4 mt-4 flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Left Column: Order Items & Shipping/Payment Details */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <OrderItemsList items={selectedItems} />

                    {/* Shipping & Payment Info Summary Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xs font-medium text-slate-500">Shipping Address</h3>
                            <p className="text-sm font-bold text-slate-900">{addressString}</p>
                        </div>
                        <div className="h-px w-full bg-slate-100"></div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xs font-medium text-slate-500">Payment Method</h3>
                            <p className="text-sm font-bold text-slate-900">{paymentString}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Calculations Summary */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
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

            {/* Mobile Sticky Confirm Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-50 md:hidden z-20 border-t border-slate-100">
                <button
                    onClick={handleConfirmOrder}
                    disabled={isSubmittingCheckout}
                    className={`w-full max-w-3xl mx-auto h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/10 ${
                        isSubmittingCheckout ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmittingCheckout ? 'Processing Order...' : 'Confirm Order'}
                </button>
            </div>
        </div>
    );
}

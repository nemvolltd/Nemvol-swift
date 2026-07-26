import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import OrderSuccessCard from './OrderSuccessCard';

export default function PurchaseSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        // Play satisfying C-Major chord success arpeggio using Web Audio API
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();

                // Note 1 (C5)
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
                gain1.gain.setValueAtTime(0.12, ctx.currentTime);
                gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                osc1.connect(gain1);
                gain1.connect(ctx.destination);
                osc1.start();
                osc1.stop(ctx.currentTime + 0.35);

                // Note 2 (E5)
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.07);
                gain2.gain.setValueAtTime(0.12, ctx.currentTime + 0.07);
                gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.start(ctx.currentTime + 0.07);
                osc2.stop(ctx.currentTime + 0.42);

                // Note 3 (G5)
                const osc3 = ctx.createOscillator();
                const gain3 = ctx.createGain();
                osc3.type = 'sine';
                osc3.frequency.setValueAtTime(783.99, ctx.currentTime + 0.14);
                gain3.gain.setValueAtTime(0.15, ctx.currentTime + 0.14);
                gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
                osc3.connect(gain3);
                gain3.connect(ctx.destination);
                osc3.start(ctx.currentTime + 0.14);
                osc3.stop(ctx.currentTime + 0.55);
            }
        } catch (error) {
            console.warn('AudioContext playback blocked or unsupported:', error);
        }
    }, []);
    
    // Resolve order from navigation state, fallback to a mock if accessed directly
    const order = location.state?.order || {
        id: 'ORD-MOCK-9999',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        shippingAddress: '57th Spring Avenue, Ikeja, Lagos.',
        paymentMethod: 'Debit Card (**** 7682)',
        total: '$256.00'
    };

    return (
        <div className="w-full max-w-md mx-auto px-4 py-12 text-center flex flex-col justify-center min-h-[80vh]">
            {/* Celebration Icon */}
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-600/20">
                <Check className="w-10 h-10" strokeWidth={3} />
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Purchase Success!</h1>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Thank you for your order. We will send you an email confirmation with tracking details shortly.
            </p>

            {/* Order Card */}
            <OrderSuccessCard order={order} />

            {/* Actions */}
            <div className="flex flex-col gap-3">
                <button
                    onClick={() => navigate('/orders')}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-blue-600/10"
                >
                    Track Order
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="w-full h-14 bg-white border border-blue-200 hover:bg-blue-50/30 text-blue-600 text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-sm"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

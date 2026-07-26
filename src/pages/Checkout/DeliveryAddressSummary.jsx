import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeliveryAddressSummary({ address }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-start justify-between">
            <div className="flex flex-col gap-1">
                <h2 className="text-sm font-bold text-slate-900">Delivery Address</h2>
                <p className="text-xs text-slate-500">
                    {address 
                        ? `${address.street}, ${address.city}, ${address.state}, ${address.country}.`
                        : 'No delivery address selected.'}
                </p>
            </div>
            <button 
                onClick={() => navigate('/addresses')}
                className="text-xs font-bold text-pink-500 hover:text-pink-600 transition-colors"
            >
                Change
            </button>
        </div>
    );
}

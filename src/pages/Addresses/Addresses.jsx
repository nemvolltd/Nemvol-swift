import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import AddressCard from './AddressCard';
import AddAddressModal from './AddAddressModal';

const AddressesSkeleton = () => (
    <div className="flex flex-col gap-4 animate-pulse">
        {[1, 2].map((i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-3">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            </div>
        ))}
    </div>
);

export default function Addresses() {
    const navigate = useNavigate();
    const {
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        isLoadingAddresses,
        errors
    } = useEcommerce();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const handleEditClick = (address) => {
        setEditingAddress(address);
        setIsModalOpen(true);
    };

    const handleAddNewClick = () => {
        setEditingAddress(null);
        setIsModalOpen(true);
    };

    const handleSaveAddress = (addressData) => {
        if (editingAddress) {
            updateAddress(editingAddress.id, addressData);
        } else {
            addAddress(addressData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 py-6 md:py-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors border border-slate-100"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-900" />
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Addresses</h1>
                </div>

                <button
                    onClick={handleAddNewClick}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md shadow-blue-600/10 transition-colors"
                    aria-label="Add new address"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            {/* List */}
            {isLoadingAddresses ? (
                <AddressesSkeleton />
            ) : errors.addresses ? (
                <div className="text-center py-10 bg-red-50/50 rounded-2xl border border-red-100/50">
                    <p className="text-red-600 text-sm font-bold">{errors.addresses}</p>
                </div>
            ) : addresses.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {addresses.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            onSetDefault={() => setDefaultAddress(address.id)}
                            onEdit={() => handleEditClick(address)}
                            onDelete={() => deleteAddress(address.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-slate-400 text-sm">
                    No shipping addresses found. Click the plus button to add one.
                </div>
            )}

            {/* Add / Edit Modal */}
            <AddAddressModal
                isOpen={isModalOpen}
                address={editingAddress}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAddress}
            />
        </div>
    );
}

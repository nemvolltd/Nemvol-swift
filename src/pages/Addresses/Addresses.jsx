import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin } from 'lucide-react';
import { useAddresses, useAddAddress, useUpdateAddress, useDeleteAddress, useSetDefaultAddress } from '../../hooks/useAddresses';
import AddressCard from './AddressCard';
import AddAddressModal from './AddAddressModal';

const AddressesSkeleton = () => (
    <div className="flex flex-col gap-4 animate-pulse">
        {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-50 flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-xl" />
                    <div className="h-3.5 bg-slate-100 rounded w-16" />
                </div>
                <div className="px-5 py-4 flex flex-col gap-2">
                    <div className="h-3.5 bg-slate-100 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="h-3 bg-slate-100 rounded w-1/3 mt-1" />
                </div>
            </div>
        ))}
    </div>
);

export default function Addresses() {
    const navigate = useNavigate();
    const { data: addresses = [], isLoading: isLoadingAddresses, error } = useAddresses();
    const { mutate: addAddress } = useAddAddress();
    const { mutate: updateAddress } = useUpdateAddress();
    const { mutate: deleteAddress } = useDeleteAddress();
    const { mutate: setDefaultAddress } = useSetDefaultAddress();

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
            updateAddress({ addressId: editingAddress.id, addressData });
        } else {
            addAddress(addressData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="w-full max-w-md mx-auto px-5 py-6 animate-pageSlideUp min-h-screen pb-16 bg-slate-50/50">

            {/* Topbar */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer border-none"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-4 h-4 text-slate-800" strokeWidth={2.2} />
                </button>

                <div className="flex flex-col items-center">
                    <h1 className="text-base font-bold text-slate-900">My Addresses</h1>
                    {!isLoadingAddresses && (
                        <span className="text-[10px] text-slate-400 font-bold">
                            {addresses.length} saved address{addresses.length !== 1 ? 'es' : ''}
                        </span>
                    )}
                </div>

                <button
                    onClick={handleAddNewClick}
                    className="w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(249,115,22,0.30)] transition-all active:scale-95 cursor-pointer border-none"
                    aria-label="Add new address"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* Address List */}
            {isLoadingAddresses ? (
                <AddressesSkeleton />
            ) : error ? (
                <div className="text-center py-10 bg-rose-50 rounded-2xl border border-rose-100">
                    <p className="text-rose-600 text-xs font-bold">{error.message}</p>
                </div>
            ) : addresses.length > 0 ? (
                <div className="flex flex-col gap-3">
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
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <MapPin className="w-7 h-7 text-slate-350" />
                    </div>
                    <h3 className="text-sm font-black text-slate-800 mb-1">No addresses yet</h3>
                    <p className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed mb-6">
                        Add a delivery address to make checkout faster and easier.
                    </p>
                    <button
                        onClick={handleAddNewClick}
                        className="flex items-center gap-2 h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black rounded-full transition-all shadow-[0_4px_16px_rgba(249,115,22,0.30)] cursor-pointer border-none"
                    >
                        <Plus className="w-4 h-4" />
                        Add First Address
                    </button>
                </div>
            )}

            {/* Modal */}
            <AddAddressModal
                isOpen={isModalOpen}
                address={editingAddress}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAddress}
            />
        </div>
    );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import AddressSelectorMini from './AddressSelectorMini';
import CartItemRow from './CartItemRow';

export default function CartDrawer({ isOpen, onClose }) {
    const navigate = useNavigate();
    const {
        cart,
        addresses,
        activeAddressId,
        toggleCartItemSelection,
        updateCartQuantity,
        removeFromCart,
        toggleSelectAll
    } = useEcommerce();

    // Find active shipping address
    const activeAddress = addresses.find(a => a.id === activeAddressId) || addresses[0];

    // Select all status
    const allSelected = cart.length > 0 && cart.every(item => item.selected);

    const handleSelectAllToggle = () => {
        toggleSelectAll(!allSelected);
    };

    const handleCheckout = () => {
        const selectedItems = cart.filter(item => item.selected);
        if (selectedItems.length === 0) {
            alert('Please select at least one item to checkout.');
            return;
        }
        onClose();
        navigate('/checkout');
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors"
                        aria-label="Close cart"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-900" />
                    </button>
                    <h2 className="text-base font-bold text-slate-900">Cart</h2>
                    <div className="relative w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full">
                        <ShoppingBag className="w-5 h-5 text-white" strokeWidth={1.5} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                            {cart.length}
                        </span>
                    </div>
                </div>

                {/* Delivery Address */}
                <AddressSelectorMini 
                    address={activeAddress} 
                    onEditClick={() => {
                        onClose();
                        navigate('/addresses');
                    }}
                />

                {/* Select All */}
                {cart.length > 0 && (
                    <div className="px-6 py-4 flex items-center gap-3">
                        <button
                            onClick={handleSelectAllToggle}
                            className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${allSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-slate-50'
                                }`}
                            aria-label="Select all items"
                        >
                            {allSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        </button>
                        <span className="text-sm font-bold text-slate-900">Select all</span>
                    </div>
                )}

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar">
                    {cart.length > 0 ? (
                        <div className="flex flex-col gap-6 py-4">
                            {cart.map((item, idx) => (
                                <CartItemRow
                                    key={`${item.product.id}-${item.size}-${idx}`}
                                    item={item}
                                    onToggleSelection={() => toggleCartItemSelection(item.product.id, item.size)}
                                    onQuantityChange={(delta) => updateCartQuantity(item.product.id, item.size, delta)}
                                    onRemove={() => removeFromCart(item.product.id, item.size)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <ShoppingBag className="w-12 h-12 text-slate-300 mb-3" />
                            <p className="text-sm text-slate-500 font-bold">Your cart is empty</p>
                            <p className="text-xs text-slate-400">Add products to your cart to checkout.</p>
                        </div>
                    )}
                </div>

                {/* Checkout Button */}
                {cart.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100">
                        <button
                            onClick={handleCheckout}
                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center shadow-lg shadow-blue-600/10"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

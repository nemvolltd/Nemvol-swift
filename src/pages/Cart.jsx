import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, Minus, Plus } from 'lucide-react';

export default function Cart() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Premium Wireless Headphones', price: 299, quantity: 1, image: '🎧', color: 'Matte Black' },
        { id: 2, name: 'Minimalist Leather Watch', price: 189, quantity: 2, image: '⌚', color: 'Space Gray' },
    ]);

    const updateQuantity = (id, delta) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    return (
        <div className="space-y-8 text-left pb-12">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-5">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Shopping Cart</h1>
                <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Continue Shopping
                </Link>
            </div>

            {cartItems.length === 0 ? (
                /* Empty State */
                <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl space-y-6 max-w-md mx-auto px-4 bg-white dark:bg-gray-900 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                        <ShoppingCart className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Your cart is empty</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Looks like you haven't added anything to your cart yet. Let's find some premium goods!
                        </p>
                    </div>
                    <Link to="/" className="inline-flex px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-0.5">
                        Shop Now
                    </Link>
                </div>
            ) : (
                /* Cart Layout */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm gap-4 hover:shadow-md transition-shadow duration-300"
                            >
                                {/* Product Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-4xl border border-gray-100 dark:border-gray-800 select-none">
                                        {item.image}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-extrabold text-gray-900 dark:text-white text-base leading-snug">{item.name}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Color: {item.color}</p>
                                        <p className="text-sm text-purple-600 dark:text-purple-400 font-bold">${item.price}</p>
                                    </div>
                                </div>

                                {/* Actions & Quantity */}
                                <div className="flex items-center justify-between w-full sm:w-auto gap-8 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50 dark:border-gray-800/50">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-2.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="px-4 text-sm font-bold text-gray-900 dark:text-white select-none">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-2.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Total & Remove */}
                                    <div className="flex items-center gap-5">
                                        <span className="font-black text-gray-900 dark:text-white text-lg">${item.price * item.quantity}</span>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer"
                                            title="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm h-fit space-y-6">
                        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Order Summary</h2>
                        <div className="space-y-4 text-sm font-medium">
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span className="font-bold text-gray-900 dark:text-white">${subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Shipping</span>
                                <span className="font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-md text-xs">Free</span>
                            </div>
                            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between text-base font-black">
                                <span className="text-gray-900 dark:text-white">Total</span>
                                <span className="text-purple-600 dark:text-purple-400 text-lg">${total}</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Proceed to Checkout <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

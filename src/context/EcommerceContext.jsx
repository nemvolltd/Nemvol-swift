import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api/index';

const EcommerceContext = createContext(undefined);

export function EcommerceProvider({ children }) {
    // Core state loaded from API
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [activeAddressId, setActiveAddressId] = useState(null);
    const [paymentCards, setPaymentCards] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: '',
        countryCode: 'NGN'
    });
    const [notificationSettings, setNotificationSettings] = useState({
        orderUpdates: true,
        promotions: false,
        newsletters: true,
        smsAlerts: false
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
        return localStorage.getItem('isAdminLoggedIn') === 'true';
    });

    // Navigation and UI States (Sync-only)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('express'); // 'standard' or 'express'
    const [paymentMethod, setPaymentMethod] = useState('pay_before'); // 'pay_before', 'pay_on_delivery', 'split'

    // Loading and Error States for API Consumption
    const [loading, setLoading] = useState({
        products: true,
        productDetails: false,
        auth: false,
        cart: false,
        wishlist: false,
        addresses: false,
        cards: false,
        settings: false,
        orders: false,
        checkout: false
    });

    const [errors, setErrors] = useState({
        products: null,
        productDetails: null,
        auth: null,
        cart: null,
        wishlist: null,
        addresses: null,
        cards: null,
        settings: null,
        orders: null,
        checkout: null
    });

    // Populate initial state from simulated API on mount
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(prev => ({
                ...prev,
                products: true,
                auth: true,
                cart: true,
                wishlist: true,
                addresses: true,
                cards: true,
                settings: true,
                orders: true
            }));

            try {
                // Fetch current user auth state
                const user = await api.getCurrentUser();
                if (user) {
                    setIsLoggedIn(true);
                    setContactInfo(user);
                }

                // Fetch other modules in parallel
                const [
                    fetchedProducts,
                    fetchedCart,
                    fetchedWishlist,
                    fetchedAddresses,
                    fetchedCards,
                    fetchedSettings,
                    fetchedOrders,
                    fetchedUsers
                ] = await Promise.all([
                    api.getProducts(),
                    api.getCart(),
                    api.getWishlist(),
                    api.getAddresses(),
                    api.getCards(),
                    api.getNotificationSettings(),
                    api.getOrders(),
                    api.getUsers()
                ]);

                setProducts(fetchedProducts);
                setCart(fetchedCart);
                setWishlist(fetchedWishlist);
                setAddresses(fetchedAddresses);
                
                const defaultAddress = fetchedAddresses.find(a => a.isDefault);
                if (defaultAddress) {
                    setActiveAddressId(defaultAddress.id);
                } else if (fetchedAddresses.length > 0) {
                    setActiveAddressId(fetchedAddresses[0].id);
                }

                setPaymentCards(fetchedCards);
                setNotificationSettings(fetchedSettings);
                setOrders(fetchedOrders);
                setUsers(fetchedUsers);
            } catch (err) {
                console.error('Failed to load e-commerce data from api:', err);
                setErrors(prev => ({ ...prev, products: 'Failed to load store content.' }));
            } finally {
                setLoading(prev => ({
                    ...prev,
                    products: false,
                    auth: false,
                    cart: false,
                    wishlist: false,
                    addresses: false,
                    cards: false,
                    settings: false,
                    orders: false
                }));
            }
        };

        fetchInitialData();
    }, []);

    // Derived State
    const debitCard = paymentCards.find(c => c.isDefault) || paymentCards[0] || {
        number: '•••• •••• •••• 0000',
        expiry: '12/99',
        cvv: '000',
        sameAsShipping: true
    };

    // --- Cart Actions ---
    const addToCart = async (product, size, quantity = 1) => {
        setLoading(prev => ({ ...prev, cart: true }));
        setErrors(prev => ({ ...prev, cart: null }));
        try {
            const updatedCart = await api.addToCart(product, size, quantity);
            setCart(updatedCart);
        } catch (err) {
            setErrors(prev => ({ ...prev, cart: err.message }));
        } finally {
            setLoading(prev => ({ ...prev, cart: false }));
        }
    };

    const removeFromCart = async (productId, size) => {
        setLoading(prev => ({ ...prev, cart: true }));
        setErrors(prev => ({ ...prev, cart: null }));
        try {
            const updatedCart = await api.removeFromCart(productId, size);
            setCart(updatedCart);
        } catch (err) {
            setErrors(prev => ({ ...prev, cart: err.message }));
        } finally {
            setLoading(prev => ({ ...prev, cart: false }));
        }
    };

    const updateCartQuantity = async (productId, size, delta) => {
        // Optimistic UI update for speed and responsiveness
        setCart(prevCart => prevCart.map(item => {
            if (item.product.id === productId && item.size === size) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));

        try {
            await api.updateCartQuantity(productId, size, delta);
        } catch (err) {
            console.error('Failed to sync quantity to server:', err);
        }
    };

    const toggleCartItemSelection = async (productId, size) => {
        // Optimistic selection toggle
        setCart(prevCart => prevCart.map(item => {
            if (item.product.id === productId && item.size === size) {
                return { ...item, selected: !item.selected };
            }
            return item;
        }));

        try {
            await api.toggleCartItemSelection(productId, size);
        } catch (err) {
            console.error('Failed to sync selection to server:', err);
        }
    };

    const toggleSelectAll = async (selectAllVal) => {
        setCart(prevCart => prevCart.map(item => ({ ...item, selected: selectAllVal })));
        try {
            await api.toggleSelectAll(selectAllVal);
        } catch (err) {
            console.error('Failed to sync bulk selection to server:', err);
        }
    };

    const clearSelectedCartItems = async () => {
        setLoading(prev => ({ ...prev, cart: true }));
        try {
            const remainingCart = await api.clearSelectedCartItems();
            setCart(remainingCart);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, cart: false }));
        }
    };

    // --- Wishlist Actions ---
    const toggleWishlist = async (productId) => {
        // Optimistic toggle
        setWishlist(prevList => {
            if (prevList.includes(productId)) {
                return prevList.filter(id => id !== productId);
            } else {
                return [...prevList, productId];
            }
        });

        try {
            await api.toggleWishlist(productId);
        } catch (err) {
            console.error('Failed to sync wishlist status:', err);
        }
    };

    const isProductWishlisted = (productId) => wishlist.includes(productId);

    // --- Address Actions ---
    const addAddress = async (addressObj) => {
        setLoading(prev => ({ ...prev, addresses: true }));
        setErrors(prev => ({ ...prev, addresses: null }));
        try {
            const updatedAddresses = await api.addAddress(addressObj);
            setAddresses(updatedAddresses);
            const defaultAddress = updatedAddresses.find(a => a.isDefault);
            if (defaultAddress) {
                setActiveAddressId(defaultAddress.id);
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, addresses: err.message }));
        } finally {
            setLoading(prev => ({ ...prev, addresses: false }));
        }
    };

    const updateAddress = async (addressId, updatedAddress) => {
        setLoading(prev => ({ ...prev, addresses: true }));
        setErrors(prev => ({ ...prev, addresses: null }));
        try {
            const updatedAddresses = await api.updateAddress(addressId, updatedAddress);
            setAddresses(updatedAddresses);
            const defaultAddress = updatedAddresses.find(a => a.isDefault);
            if (defaultAddress) {
                setActiveAddressId(defaultAddress.id);
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, addresses: err.message }));
        } finally {
            setLoading(prev => ({ ...prev, addresses: false }));
        }
    };

    const deleteAddress = async (addressId) => {
        setLoading(prev => ({ ...prev, addresses: true }));
        setErrors(prev => ({ ...prev, addresses: null }));
        try {
            const updatedAddresses = await api.deleteAddress(addressId);
            setAddresses(updatedAddresses);
            if (activeAddressId === addressId && updatedAddresses.length > 0) {
                setActiveAddressId(updatedAddresses[0].id);
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, addresses: err.message }));
        } finally {
            setLoading(prev => ({ ...prev, addresses: false }));
        }
    };

    const setDefaultAddress = async (addressId) => {
        setAddresses(prev => prev.map(a => ({
            ...a,
            isDefault: a.id === addressId
        })));
        setActiveAddressId(addressId);
        try {
            await api.updateAddress(addressId, { isDefault: true });
        } catch (err) {
            console.error('Failed to set default address on server:', err);
        }
    };

    // --- Checkout & Payment Actions ---
    const updateContactInfo = async (infoObj) => {
        try {
            const updated = await api.updateContactInfo(infoObj);
            setContactInfo(updated);
        } catch (err) {
            console.error(err);
        }
    };

    const updateDeliveryMethod = (methodStr) => {
        setDeliveryMethod(methodStr);
    };

    const updatePaymentMethod = (methodStr) => {
        setPaymentMethod(methodStr);
    };

    const updateDebitCard = (cardObj) => {
        // Debit card is local helper, updates default card details
        setPaymentCards(prev => prev.map(c => {
            if (c.isDefault) {
                return { ...c, ...cardObj };
            }
            return c;
        }));
    };

    const addPaymentCard = async (cardData) => {
        setLoading(prev => ({ ...prev, cards: true }));
        try {
            const updatedCards = await api.addCard(cardData);
            setPaymentCards(updatedCards);
        } catch (err) {
            setErrors(prev => ({ ...prev, cards: err.message }));
        } finally {
            setLoading(prev => ({ ...prev, cards: false }));
        }
    };

    const deletePaymentCard = async (cardId) => {
        setLoading(prev => ({ ...prev, cards: true }));
        try {
            const updatedCards = await api.deleteCard(cardId);
            setPaymentCards(updatedCards);
        } catch (err) {
            setErrors(prev => ({ ...prev, cards: err.message }));
        } finally {
            setLoading(prev => ({ ...prev, cards: false }));
        }
    };

    const setDefaultPaymentCard = async (cardId) => {
        setPaymentCards(prev => prev.map(c => ({
            ...c,
            isDefault: c.id === cardId
        })));
        try {
            await api.setDefaultCard(cardId);
        } catch (err) {
            console.error(err);
        }
    };

    const updateNotificationSettings = async (settings) => {
        setLoading(prev => ({ ...prev, settings: true }));
        try {
            const updated = await api.updateNotificationSettings(settings);
            setNotificationSettings(updated);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, settings: false }));
        }
    };

    // --- Authentication ---
    const loginUser = async (email, password) => {
        setLoading(prev => ({ ...prev, auth: true }));
        setErrors(prev => ({ ...prev, auth: null }));
        try {
            const res = await api.login(email, password);
            setIsLoggedIn(true);
            setContactInfo(res.user);
            return res.user;
        } catch (err) {
            setErrors(prev => ({ ...prev, auth: err.message }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, auth: false }));
        }
    };

    const signupUser = async (name, email, password) => {
        setLoading(prev => ({ ...prev, auth: true }));
        setErrors(prev => ({ ...prev, auth: null }));
        try {
            const res = await api.signup(name, email, password);
            setIsLoggedIn(true);
            setContactInfo(res.user);
            return res.user;
        } catch (err) {
            setErrors(prev => ({ ...prev, auth: err.message }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, auth: false }));
        }
    };

    const logoutUser = async () => {
        setLoading(prev => ({ ...prev, auth: true }));
        try {
            await api.logout();
            setIsLoggedIn(false);
            // Reset state
            setCart([]);
            setOrders([]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, auth: false }));
        }
    };

    const loginAdmin = async (email, password) => {
        setLoading(prev => ({ ...prev, auth: true }));
        setErrors(prev => ({ ...prev, auth: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 800)); // simulated latency
            if (email === 'admin@nemvol.com' && password === 'admin123') {
                setIsAdminLoggedIn(true);
                localStorage.setItem('isAdminLoggedIn', 'true');
                return true;
            } else {
                throw new Error('Invalid Admin Credentials. Try admin@nemvol.com / admin123');
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, auth: err.message }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, auth: false }));
        }
    };

    const logoutAdmin = () => {
        setIsAdminLoggedIn(false);
        localStorage.removeItem('isAdminLoggedIn');
    };

    // --- Order placement ---
    const placeOrder = async () => {
        const selectedItems = cart.filter(item => item.selected);
        if (selectedItems.length === 0) return null;

        setLoading(prev => ({ ...prev, checkout: true }));
        setErrors(prev => ({ ...prev, checkout: null }));

        try {
            const subtotal = selectedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            const deliveryFee = deliveryMethod === 'express' ? 100 : 50;
            const tax = 5.00;
            const totalVal = subtotal + deliveryFee + tax;

            const activeAddress = addresses.find(a => a.id === activeAddressId) || addresses[0];
            const shippingAddressString = activeAddress 
                ? `${activeAddress.street}, ${activeAddress.city}, ${activeAddress.state}.`
                : 'No address specified.';

            const paymentMethodString = paymentMethod === 'pay_on_delivery' 
                ? 'Pay on Delivery' 
                : paymentMethod === 'split' 
                    ? 'Split Payment (Stripe)'
                    : `Debit Card (**** ${debitCard.number.slice(-4)})`;

            const orderPayload = {
                total: `$${totalVal.toFixed(2)}`,
                items: selectedItems.map(item => ({
                    product: item.product,
                    quantity: item.quantity,
                    size: item.size
                })),
                shippingAddress: shippingAddressString,
                paymentMethod: paymentMethodString
            };

            const newOrder = await api.placeOrder(orderPayload);
            setOrders(prev => [newOrder, ...prev]);
            setCart(prevCart => prevCart.filter(item => !item.selected));
            return newOrder;
        } catch (err) {
            setErrors(prev => ({ ...prev, checkout: err.message }));
            return null;
        } finally {
            setLoading(prev => ({ ...prev, checkout: false }));
        }
    };

    const getProductById = async (productId) => {
        setLoading(prev => ({ ...prev, productDetails: true }));
        setErrors(prev => ({ ...prev, productDetails: null }));
        try {
            const product = await api.getProductById(productId);
            return product;
        } catch (err) {
            setErrors(prev => ({ ...prev, productDetails: err.message }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, productDetails: false }));
        }
    };

    // --- Admin Actions ---
    const createProduct = async (productData) => {
        setLoading(prev => ({ ...prev, products: true }));
        setErrors(prev => ({ ...prev, products: null }));
        try {
            const updatedProducts = await api.createProduct(productData);
            setProducts(updatedProducts);
        } catch (err) {
            setErrors(prev => ({ ...prev, products: err.message }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, products: false }));
        }
    };

    const updateProduct = async (productId, productData) => {
        setLoading(prev => ({ ...prev, products: true }));
        setErrors(prev => ({ ...prev, products: null }));
        try {
            const updatedProducts = await api.updateProduct(productId, productData);
            setProducts(updatedProducts);
        } catch (err) {
            setErrors(prev => ({ ...prev, products: err.message }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, products: false }));
        }
    };

    const deleteProduct = async (productId) => {
        setLoading(prev => ({ ...prev, products: true }));
        setErrors(prev => ({ ...prev, products: null }));
        try {
            const updatedProducts = await api.deleteProduct(productId);
            setProducts(updatedProducts);
        } catch (err) {
            setErrors(prev => ({ ...prev, products: err.message }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, products: false }));
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        setLoading(prev => ({ ...prev, orders: true }));
        setErrors(prev => ({ ...prev, orders: null }));
        try {
            const updatedOrders = await api.updateOrderStatus(orderId, status);
            setOrders(updatedOrders);
        } catch (err) {
            setErrors(prev => ({ ...prev, orders: err.message }));
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, orders: false }));
        }
    };

    return (
        <EcommerceContext.Provider value={{
            products,
            cart,
            wishlist,
            addresses,
            activeAddressId,
            contactInfo,
            deliveryMethod,
            paymentMethod,
            debitCard,
            orders,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            toggleCartItemSelection,
            toggleSelectAll,
            toggleWishlist,
            isProductWishlisted,
            addAddress,
            updateAddress,
            deleteAddress,
            setDefaultAddress,
            updateContactInfo,
            updateDeliveryMethod,
            updatePaymentMethod,
            updateDebitCard,
            placeOrder,
            isCartOpen,
            setIsCartOpen,
            paymentCards,
            users,
            addPaymentCard,
            deletePaymentCard,
            setDefaultPaymentCard,
            notificationSettings,
            updateNotificationSettings,
            isLoggedIn,
            loginUser,
            signupUser,
            logoutUser,
            isSearchOpen,
            setIsSearchOpen,
            getProductById,
            
            // Admin Auth
            isAdminLoggedIn,
            loginAdmin,
            logoutAdmin,
            
            // Admin actions
            createProduct,
            updateProduct,
            deleteProduct,
            updateOrderStatus,
            
            // Async helper state exposures
            isLoadingProducts: loading.products,
            isLoadingProductDetails: loading.productDetails,
            isLoadingAuth: loading.auth,
            isLoadingCart: loading.cart,
            isLoadingWishlist: loading.wishlist,
            isLoadingAddresses: loading.addresses,
            isLoadingCards: loading.cards,
            isLoadingSettings: loading.settings,
            isLoadingOrders: loading.orders,
            isSubmittingCheckout: loading.checkout,
            errors
        }}>
            {children}
        </EcommerceContext.Provider>
    );
}

export function useEcommerce() {
    const context = useContext(EcommerceContext);
    if (!context) {
        throw new Error('useEcommerce must be used within an EcommerceProvider');
    }
    return context;
}

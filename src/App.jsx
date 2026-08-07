import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BottomBar from './components/BottomBar/BottomBar';
import CartDrawer from './components/CartDrawer/CartDrawer';
import SearchDrawer from './components/SearchDrawer/SearchDrawer';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Checkout from './pages/Checkout/Checkout';
import Wishlist from './pages/Wishlist/Wishlist';
import Profile from './pages/Profile/Profile';
import ReviewDetails from './pages/ReviewDetails/ReviewDetails';
import PurchaseSuccess from './pages/PurchaseSuccess/PurchaseSuccess';
import Orders from './pages/Orders/Orders';
import Addresses from './pages/Addresses/Addresses';
import PaymentMethods from './pages/PaymentMethods/PaymentMethods';
import Settings from './pages/Settings/Settings';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Admin layout + pages
import AdminLayout   from './pages/Admin/layout/AdminLayout';
import AdminLogin    from './pages/Admin/AdminLogin';
import Overview      from './pages/Admin/Overview';
import AdminProducts from './pages/Admin/Products';
import AdminCategories from './pages/Admin/Categories';
import AdminOrders   from './pages/Admin/Orders';
import AdminUsers    from './pages/Admin/Users';
import AdminSettings from './pages/Admin/Settings';
import AdminNotifications from './pages/Admin/Notifications';

import useStore from './store/useStore';
import { useProducts } from './hooks/useProducts';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default function App() {
    const isCartOpen = useStore((s) => s.isCartOpen);
    const setIsCartOpen = useStore((s) => s.setIsCartOpen);
    const isSearchOpen = useStore((s) => s.isSearchOpen);
    const setIsSearchOpen = useStore((s) => s.setIsSearchOpen);
    const isAdminLoggedIn = useStore((s) => s.isAdminLoggedIn);

    const { isLoading: isLoadingProducts } = useProducts();
    const location = useLocation();

    // Show loading screen while products fetch on first load
    if (isLoadingProducts) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-3 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                    <p className="text-sm text-slate-500 font-medium tracking-wide">Loading store...</p>
                </div>
            </div>
        );
    }

    // Check if current path is a page that should hide the global navigation
    const hideNavigation = location.pathname.startsWith('/product/') ||
        location.pathname.startsWith('/admin') ||
        location.pathname === '/checkout' ||
        location.pathname === '/review' ||
        location.pathname === '/success' ||
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/forgot-password';

    return (
        <div className={`min-h-screen bg-white text-slate-900 flex flex-col font-sans ${hideNavigation ? '' : 'pb-16 md:pb-0'}`}>
            <ScrollToTop />
            {!hideNavigation && <Navbar />}
            <main className="flex-1 flex flex-col w-full">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    <Route path="/wishlist" element={<Wishlist />} />

                    {/* Protected Routes (require login) */}
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/review" element={<ProtectedRoute><ReviewDetails /></ProtectedRoute>} />
                    <Route path="/success" element={<ProtectedRoute><PurchaseSuccess /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
                    <Route path="/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                        path="/admin"
                        element={
                            isAdminLoggedIn
                                ? <AdminLayout />
                                : <Navigate to="/admin/login" replace />
                        }
                    >
                        {/* Index → redirect to overview */}
                        <Route index element={<Navigate to="overview" replace />} />
                        <Route path="overview"    element={<Overview />} />
                        <Route path="products"    element={<AdminProducts />} />
                        <Route path="categories"  element={<AdminCategories />} />
                        <Route path="orders"      element={<AdminOrders />} />
                        <Route path="users"       element={<AdminUsers />} />
                        <Route path="settings"    element={<AdminSettings />} />
                        <Route path="notifications" element={<AdminNotifications />} />
                    </Route>
                </Routes>
            </main>
            {!hideNavigation && <Footer />}
            {!hideNavigation && <BottomBar />}

            {/* Global Cart Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* Global Search Drawer */}
            <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
}

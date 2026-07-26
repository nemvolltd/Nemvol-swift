import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import BottomBar from './components/BottomBar/BottomBar';
import CartDrawer from './components/CartDrawer/CartDrawer';
import SearchDrawer from './components/SearchDrawer/SearchDrawer';
import Footer from './components/Footer/Footer';
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
import AdminDashboard from './pages/Admin/AdminDashboard';
import { useEcommerce } from './context/EcommerceContext';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const { isCartOpen, setIsCartOpen, isSearchOpen, setIsSearchOpen, isLoadingProducts } = useEcommerce();
  const location = useLocation();

  if (isLoadingProducts) {
    return <LoadingScreen />;
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
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/review" element={<ReviewDetails />} />
          <Route path="/success" element={<PurchaseSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<AdminDashboard />} />
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

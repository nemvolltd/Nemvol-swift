import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand store for client-only UI state and auth tokens.
 * Server state (products, cart, orders, etc.) is managed by TanStack Query.
 * 
 * Uses `persist` middleware to survive page reloads for auth state.
 */
const useStore = create(
    persist(
        (set, get) => ({
            // ── Auth State ──
            token: null,
            refreshToken: null,
            isLoggedIn: false,
            isAdminLoggedIn: false,
            user: null,

            setAuth: (token, user, refreshToken = null) => set({
                token,
                refreshToken,
                isLoggedIn: true,
                user,
            }),

            clearAuth: () => set({
                token: null,
                refreshToken: null,
                isLoggedIn: false,
                user: null,
            }),

            setUser: (user) => set({ user }),

            setAdminAuth: (isAdmin) => set({ isAdminLoggedIn: isAdmin }),

            clearAdminAuth: () => set({ isAdminLoggedIn: false }),

            // ── UI State (not persisted) ──
            isCartOpen: false,
            setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

            isSearchOpen: false,
            setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),

            // ── Modal/Overlay registration (not persisted) ──
            // Any modal/drawer increments this on open and decrements on close.
            // BottomBar hides itself whenever this is > 0.
            openModalsCount: 0,
            pushModal: () => set((s) => ({ openModalsCount: s.openModalsCount + 1 })),
            popModal:  () => set((s) => ({ openModalsCount: Math.max(0, s.openModalsCount - 1) })),

            // ── Checkout State ──
            deliveryMethod: 'express', // 'standard' | 'express'
            setDeliveryMethod: (method) => set({ deliveryMethod: method }),

            paymentMethod: 'pay_before', // 'pay_before' | 'pay_on_delivery' | 'split'
            setPaymentMethod: (method) => set({ paymentMethod: method }),

            activeAddressId: null,
            setActiveAddressId: (id) => set({ activeAddressId: id }),
        }),
        {
            name: 'nemvol-store',
            // Only persist auth-related state across reloads
            partialize: (state) => ({
                token: state.token,
                refreshToken: state.refreshToken,
                isLoggedIn: state.isLoggedIn,
                isAdminLoggedIn: state.isAdminLoggedIn,
                user: state.user,
                activeAddressId: state.activeAddressId,
            }),
        }
    )
);

export default useStore;

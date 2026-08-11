import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useStore from '../store/useStore';

// ── Local mock user store ──────────────────────────────────────────────────
const MOCK_USERS_KEY = 'mock-users';

const getUsers = () => {
    try { return JSON.parse(localStorage.getItem(MOCK_USERS_KEY)) || []; }
    catch { return []; }
};

const saveUsers = (users) => {
    try { localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users)); }
    catch { /* ignore */ }
};

// ── Current user ─────────────────────────────────────────────────────────────
/**
 * Returns the currently logged-in user from the Zustand store.
 */
export function useCurrentUser() {
    const token = useStore((s) => s.token);
    const user  = useStore((s) => s.user);
    return useQuery({
        queryKey: ['user'],
        queryFn:  async () => user || null,
        enabled:  !!token,
    });
}

// ── Login ────────────────────────────────────────────────────────────────────
/**
 * Login with email + password against the local user registry.
 */
export function useLogin() {
    const setAuth       = useStore((s) => s.setAuth);
    const queryClient   = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password }) => {
            const users = getUsers();
            const found = users.find(
                (u) => u.email === email && u.password === password
            );
            if (!found) throw new Error('Invalid email or password.');
            const token = `local-token-${Date.now()}`;
            return {
                token,
                refreshToken: `local-refresh-${Date.now()}`,
                user: { id: found.id, name: found.name, email: found.email },
            };
        },
        onSuccess: (data) => {
            setAuth(data.token, data.user, data.refreshToken);
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}

// ── Signup ───────────────────────────────────────────────────────────────────
/**
 * Register a new user and auto-login.
 */
export function useSignup() {
    const setAuth       = useStore((s) => s.setAuth);
    const queryClient   = useQueryClient();
    return useMutation({
        mutationFn: async ({ name, firstName, lastName, email, password }) => {
            const users = getUsers();
            if (users.find((u) => u.email === email)) {
                throw new Error('An account with this email already exists.');
            }
            const displayName = name || `${firstName || ''} ${lastName || ''}`.trim() || email.split('@')[0];
            const newUser = {
                id:       Date.now(),
                name:     displayName,
                email,
                password, // stored locally only
            };
            saveUsers([...users, newUser]);
            const token = `local-token-${Date.now()}`;
            return {
                token,
                refreshToken: `local-refresh-${Date.now()}`,
                user: { id: newUser.id, name: newUser.name, email: newUser.email },
            };
        },
        onSuccess: (data) => {
            setAuth(data.token, data.user, data.refreshToken);
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}

// ── Logout ───────────────────────────────────────────────────────────────────
/**
 * Clear local auth state and all cached server queries.
 */
export function useLogout() {
    const clearAuth   = useStore((s) => s.clearAuth);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => ({ success: true }),
        onSuccess: () => {
            clearAuth();
            queryClient.clear();
        },
        onError: () => {
            clearAuth();
            queryClient.clear();
        },
    });
}

// ── Admin login ───────────────────────────────────────────────────────────────
/**
 * Admin login — accepts any credentials in local-only mode.
 */
export function useAdminLogin() {
    const setAdminAuth = useStore((s) => s.setAdminAuth);
    return useMutation({
        mutationFn: async ({ email, password }) => {
            if (!email || !password) throw new Error('Email and password are required.');
            return { success: true };
        },
        onSuccess: () => {
            setAdminAuth(true);
        },
    });
}

// ── Admin logout ──────────────────────────────────────────────────────────────
/**
 * Admin logout — clears admin auth flag.
 */
export function useAdminLogout() {
    const clearAdminAuth = useStore((s) => s.clearAdminAuth);
    return {
        logout: () => clearAdminAuth(),
    };
}

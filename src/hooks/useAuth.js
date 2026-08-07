import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';
import useStore from '../store/useStore';

/**
 * Fetch current user profile
 */
export function useCurrentUser() {
    const token = useStore((s) => s.token);
    return useQuery({
        queryKey: ['user'],
        queryFn: api.getCurrentUser,
        enabled: !!token,
    });
}

/**
 * Login mutation
 */
export function useLogin() {
    const setAuth = useStore((s) => s.setAuth);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ email, password }) => api.login(email, password),
        onSuccess: (data) => {
            // Store token, user and refreshToken in Zustand
            setAuth(data.token || 'mock-token', data.user, data.refreshToken);
            // Refetch user-specific queries now that we're logged in
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}

/**
 * Signup mutation
 */
export function useSignup() {
    const setAuth = useStore((s) => s.setAuth);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => api.signup(payload),
        onSuccess: (data) => {
            setAuth(data.token || 'mock-token', data.user, data.refreshToken);
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}

/**
 * Logout mutation
 */
export function useLogout() {
    const clearAuth = useStore((s) => s.clearAuth);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => api.logout(),
        onSuccess: () => {
            clearAuth();
            queryClient.clear();
        },
        onError: () => {
            // Even if logout API fails, clear local state
            clearAuth();
            queryClient.clear();
        },
    });
}

/**
 * Admin login mutation
 */
export function useAdminLogin() {
    const setAdminAuth = useStore((s) => s.setAdminAuth);
    return useMutation({
        mutationFn: ({ email, password }) => api.loginAdmin(email, password),
        onSuccess: () => {
            setAdminAuth(true);
        },
    });
}

/**
 * Admin logout
 */
export function useAdminLogout() {
    const clearAdminAuth = useStore((s) => s.clearAdminAuth);
    return {
        logout: () => clearAdminAuth(),
    };
}

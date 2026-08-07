import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useStore from '../store/useStore';

/**
 * Fetch current user profile (Mocked to avoid actual API calls)
 */
export function useCurrentUser() {
    const token = useStore((s) => s.token);
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            // Simulated network delay
            await new Promise(resolve => setTimeout(resolve, 200));
            return {
                id: 1,
                name: 'Frank User',
                email: 'frank@example.com',
            };
        },
        enabled: !!token,
    });
}

/**
 * Login mutation (Mocked to avoid actual API calls)
 */
export function useLogin() {
    const setAuth = useStore((s) => s.setAuth);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ email, password }) => {
            // Simulated network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            return {
                token: 'mock-jwt-token-xyz123',
                refreshToken: 'mock-refresh-token-abc987',
                user: {
                    id: 1,
                    name: email.split('@')[0],
                    email: email
                }
            };
        },
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
 * Signup mutation (Mocked to avoid actual API calls)
 */
export function useSignup() {
    const setAuth = useStore((s) => s.setAuth);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            // Simulated network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            return {
                token: 'mock-jwt-token-xyz123',
                refreshToken: 'mock-refresh-token-abc987',
                user: {
                    id: 1,
                    name: payload.name || payload.email.split('@')[0],
                    email: payload.email
                }
            };
        },
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
 * Logout mutation (Mocked to avoid actual API calls)
 */
export function useLogout() {
    const clearAuth = useStore((s) => s.clearAuth);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            // Simulated network delay
            await new Promise(resolve => setTimeout(resolve, 300));
            return { success: true };
        },
        onSuccess: () => {
            clearAuth();
            queryClient.clear();
        },
        onError: () => {
            // Even if logout fails, clear local state
            clearAuth();
            queryClient.clear();
        },
    });
}

/**
 * Admin login mutation (Mocked to avoid actual API calls)
 */
export function useAdminLogin() {
    const setAdminAuth = useStore((s) => s.setAdminAuth);
    return useMutation({
        mutationFn: async ({ email, password }) => {
            // Simulated network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            return { success: true };
        },
        onSuccess: () => {
            setAdminAuth(true);
        },
    });
}

/**
 * Admin logout (Mocked to avoid actual API calls)
 */
export function useAdminLogout() {
    const clearAdminAuth = useStore((s) => s.clearAdminAuth);
    return {
        logout: () => clearAdminAuth(),
    };
}

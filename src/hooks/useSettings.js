import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';
import useStore from '../store/useStore';

/**
 * Fetch notification settings
 */
export function useNotificationSettings() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['notifications'],
        queryFn: api.getNotificationSettings,
        enabled: isLoggedIn,
    });
}

/**
 * Update notification settings
 */
export function useUpdateNotificationSettings() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (settings) => api.updateNotificationSettings(settings),
        onSuccess: (updated) => {
            queryClient.setQueryData(['notifications'], updated);
        },
    });
}

/**
 * Update user contact info
 */
export function useUpdateContactInfo() {
    const queryClient = useQueryClient();
    const setUser = useStore((s) => s.setUser);
    return useMutation({
        mutationFn: (infoObj) => api.updateContactInfo(infoObj),
        onSuccess: (updated) => {
            setUser(updated);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}

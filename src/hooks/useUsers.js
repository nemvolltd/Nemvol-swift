import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api/index';
import useStore from '../store/useStore';

/**
 * Fetch all registered users (admin only)
 */
export function useUsers() {
    const isAdminLoggedIn = useStore((s) => s.isAdminLoggedIn);
    return useQuery({
        queryKey: ['users'],
        queryFn: api.getUsers,
        enabled: isAdminLoggedIn,
    });
}

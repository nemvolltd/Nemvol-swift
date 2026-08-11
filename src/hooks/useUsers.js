import { useQuery } from '@tanstack/react-query';
import useStore from '../store/useStore';

// ── Local storage helpers ────────────────────────────────────────────────────
const USERS_KEY = 'mock-users';

const getLocalUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch { return []; }
};

// ── useUsers ─────────────────────────────────────────────────────────────────
/**
 * Fetch all registered users from local storage (admin only).
 * Users are created via the signup flow in useAuth.js.
 */
export function useUsers() {
    const isAdminLoggedIn = useStore((s) => s.isAdminLoggedIn);
    return useQuery({
        queryKey: ['users'],
        queryFn:  () => getLocalUsers().map(({ password: _omit, ...u }) => u), // strip passwords
        enabled:  isAdminLoggedIn,
    });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useStore from '../store/useStore';

// ── Local storage helpers ────────────────────────────────────────────────────
const ADDRESSES_KEY = 'local-addresses';

const getLocalAddresses = () => {
    try { return JSON.parse(localStorage.getItem(ADDRESSES_KEY)) || []; }
    catch { return []; }
};

const saveLocalAddresses = (addresses) => {
    try { localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses)); }
    catch { /* ignore */ }
};

// ── useAddresses ─────────────────────────────────────────────────────────────
/**
 * Fetch all saved addresses from localStorage (requires login).
 */
export function useAddresses() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['addresses'],
        queryFn:  () => getLocalAddresses(),
        enabled:  isLoggedIn,
    });
}

// ── useAddAddress ─────────────────────────────────────────────────────────────
/**
 * Save a new address locally.
 */
export function useAddAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (addressObj) => {
            const current = getLocalAddresses();
            const newEntry = { ...addressObj, id: Date.now() };
            // If this is the first address, mark it as default
            if (current.length === 0) newEntry.isDefault = true;
            const updated = [...current, newEntry];
            saveLocalAddresses(updated);
            return updated;
        },
        onSuccess: (updatedAddresses) => {
            queryClient.setQueryData(['addresses'], updatedAddresses);
        },
    });
}

// ── useUpdateAddress ──────────────────────────────────────────────────────────
/**
 * Update an existing address in localStorage.
 */
export function useUpdateAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ addressId, addressData }) => {
            const updated = getLocalAddresses().map((a) =>
                a.id === addressId ? { ...a, ...addressData } : a
            );
            saveLocalAddresses(updated);
            return updated;
        },
        onSuccess: (updatedAddresses) => {
            queryClient.setQueryData(['addresses'], updatedAddresses);
        },
    });
}

// ── useDeleteAddress ──────────────────────────────────────────────────────────
/**
 * Remove an address from localStorage.
 */
export function useDeleteAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (addressId) => {
            const updated = getLocalAddresses().filter((a) => a.id !== addressId);
            saveLocalAddresses(updated);
            return updated;
        },
        onSuccess: (updatedAddresses) => {
            queryClient.setQueryData(['addresses'], updatedAddresses);
        },
    });
}

// ── useSetDefaultAddress ──────────────────────────────────────────────────────
/**
 * Mark an address as the default (optimistic update).
 */
export function useSetDefaultAddress() {
    const queryClient        = useQueryClient();
    const setActiveAddressId = useStore((s) => s.setActiveAddressId);
    return useMutation({
        mutationFn: async (addressId) => {
            const updated = getLocalAddresses().map((a) => ({
                ...a,
                isDefault: a.id === addressId,
            }));
            saveLocalAddresses(updated);
            return updated;
        },
        onMutate: async (addressId) => {
            await queryClient.cancelQueries({ queryKey: ['addresses'] });
            const previous = queryClient.getQueryData(['addresses']);
            queryClient.setQueryData(['addresses'], (old) =>
                old?.map((a) => ({ ...a, isDefault: a.id === addressId }))
            );
            setActiveAddressId(addressId);
            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['addresses'], context?.previous);
        },
        onSuccess: (updatedAddresses) => {
            queryClient.setQueryData(['addresses'], updatedAddresses);
        },
    });
}

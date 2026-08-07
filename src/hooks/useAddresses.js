import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';
import useStore from '../store/useStore';

/**
 * Fetch all addresses
 */
export function useAddresses() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['addresses'],
        queryFn: api.getAddresses,
        enabled: isLoggedIn,
    });
}

/**
 * Add a new address
 */
export function useAddAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (addressObj) => api.addAddress(addressObj),
        onSuccess: (updatedAddresses) => {
            queryClient.setQueryData(['addresses'], updatedAddresses);
        },
    });
}

/**
 * Update an existing address
 */
export function useUpdateAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ addressId, addressData }) => api.updateAddress(addressId, addressData),
        onSuccess: (updatedAddresses) => {
            queryClient.setQueryData(['addresses'], updatedAddresses);
        },
    });
}

/**
 * Delete an address
 */
export function useDeleteAddress() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (addressId) => api.deleteAddress(addressId),
        onSuccess: (updatedAddresses) => {
            queryClient.setQueryData(['addresses'], updatedAddresses);
        },
    });
}

/**
 * Set an address as default (optimistic)
 */
export function useSetDefaultAddress() {
    const queryClient = useQueryClient();
    const setActiveAddressId = useStore((s) => s.setActiveAddressId);
    return useMutation({
        mutationFn: (addressId) => api.updateAddress(addressId, { isDefault: true }),
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
    });
}

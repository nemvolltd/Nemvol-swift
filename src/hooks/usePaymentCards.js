import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';
import useStore from '../store/useStore';

/**
 * Fetch all saved payment cards
 */
export function usePaymentCards() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['cards'],
        queryFn: api.getCards,
        enabled: isLoggedIn,
    });
}

/**
 * Add a new payment card
 */
export function useAddCard() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cardData) => api.addCard(cardData),
        onSuccess: (updatedCards) => {
            queryClient.setQueryData(['cards'], updatedCards);
        },
    });
}

/**
 * Delete a payment card
 */
export function useDeleteCard() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cardId) => api.deleteCard(cardId),
        onSuccess: (updatedCards) => {
            queryClient.setQueryData(['cards'], updatedCards);
        },
    });
}

/**
 * Set a card as default (optimistic)
 */
export function useSetDefaultCard() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cardId) => api.setDefaultCard(cardId),
        onMutate: async (cardId) => {
            await queryClient.cancelQueries({ queryKey: ['cards'] });
            const previous = queryClient.getQueryData(['cards']);
            queryClient.setQueryData(['cards'], (old) =>
                old?.map((c) => ({ ...c, isDefault: c.id === cardId }))
            );
            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['cards'], context?.previous);
        },
    });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useStore from '../store/useStore';

// ── Local storage helpers ────────────────────────────────────────────────────
const CARDS_KEY = 'local-payment-cards';

const getLocalCards = () => {
    try { return JSON.parse(localStorage.getItem(CARDS_KEY)) || []; }
    catch { return []; }
};

const saveLocalCards = (cards) => {
    try { localStorage.setItem(CARDS_KEY, JSON.stringify(cards)); }
    catch { /* ignore */ }
};

// ── usePaymentCards ───────────────────────────────────────────────────────────
/**
 * Fetch all saved payment cards from localStorage (requires login).
 */
export function usePaymentCards() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['cards'],
        queryFn:  () => getLocalCards(),
        enabled:  isLoggedIn,
    });
}

// ── useAddCard ────────────────────────────────────────────────────────────────
/**
 * Save a new payment card locally.
 */
export function useAddCard() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (cardData) => {
            const current = getLocalCards();
            const newCard = { ...cardData, id: Date.now() };
            // First card becomes the default
            if (current.length === 0) newCard.isDefault = true;
            const updated = [...current, newCard];
            saveLocalCards(updated);
            return updated;
        },
        onSuccess: (updatedCards) => {
            queryClient.setQueryData(['cards'], updatedCards);
        },
    });
}

// ── useDeleteCard ─────────────────────────────────────────────────────────────
/**
 * Remove a payment card from localStorage.
 */
export function useDeleteCard() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (cardId) => {
            const updated = getLocalCards().filter((c) => c.id !== cardId);
            saveLocalCards(updated);
            return updated;
        },
        onSuccess: (updatedCards) => {
            queryClient.setQueryData(['cards'], updatedCards);
        },
    });
}

// ── useSetDefaultCard ─────────────────────────────────────────────────────────
/**
 * Mark a card as the default (optimistic update).
 */
export function useSetDefaultCard() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (cardId) => {
            const updated = getLocalCards().map((c) => ({
                ...c,
                isDefault: c.id === cardId,
            }));
            saveLocalCards(updated);
            return updated;
        },
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
        onSuccess: (updatedCards) => {
            queryClient.setQueryData(['cards'], updatedCards);
        },
    });
}

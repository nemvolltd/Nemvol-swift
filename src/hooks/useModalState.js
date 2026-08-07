import { useEffect } from 'react';
import useStore from '../store/useStore';

/**
 * useModalState — call this inside any modal/drawer component.
 *
 * When `isOpen` is true  → registers the overlay in the global store (pushModal).
 * When `isOpen` is false → unregisters it (popModal).
 * Also cleans up automatically on unmount so the count never leaks.
 *
 * The BottomBar reads `openModalsCount` and hides itself whenever it is > 0.
 *
 * Usage:
 *   import { useModalState } from '../../hooks/useModalState';
 *   export default function MyModal({ isOpen }) {
 *     useModalState(isOpen);
 *     ...
 *   }
 */
export function useModalState(isOpen) {
    const pushModal = useStore((s) => s.pushModal);
    const popModal  = useStore((s) => s.popModal);

    useEffect(() => {
        if (isOpen) {
            pushModal();
            return () => popModal();   // cleanup: decrement when closed or unmounted
        }
    }, [isOpen]);  // eslint-disable-line react-hooks/exhaustive-deps
}

import {useEffect, RefObject} from 'react';
import {activateFocusTrap, type FocusTrapOptions} from '@/utils/focusTrap';

/**
 * Binds a focus trap to the element pointed by ref.
 * Tab / Shift+Tab cycles focus only inside the element; optional initial focus on first focusable.
 */
export function useFocusTrap<T extends HTMLElement>(
    ref: RefObject<T | null>,
    options: FocusTrapOptions = {}
): void {
    const {initialFocus = false} = options;

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        return activateFocusTrap(container, {initialFocus});
    }, [ref, initialFocus]);
}

import {getFocusableElements} from './getFocusableElements';

/**
 * Handles Tab / Shift+Tab to keep focus inside the container (focus trap).
 * Call from keydown handler; prevents default and moves focus when at boundary.
 * Returns true if the event was handled (Tab at first/last element).
 */
export function handleFocusTrapKeyDown(
    container: HTMLElement,
    e: KeyboardEvent
): boolean {
    if (e.key !== 'Tab') return false;

    const focusable = getFocusableElements(container);
    if (focusable.length === 0) return false;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
        if (active === first || !container.contains(active)) {
            e.preventDefault();
            last.focus();
            return true;
        }
    } else {
        if (active === last || !container.contains(active)) {
            e.preventDefault();
            first.focus();
            return true;
        }
    }
    return false;
}

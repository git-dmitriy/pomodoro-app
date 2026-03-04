import {getFocusableElements} from './getFocusableElements';
import {handleFocusTrapKeyDown} from './handleFocusTrapKeyDown';

export type FocusTrapOptions = {
    /** Focus the first focusable element when trap is activated */
    initialFocus?: boolean;
};

/**
 * Activates a focus trap on the container: adds keydown listener for Tab/Shift+Tab
 * and optionally focuses the first focusable element.
 * Returns a cleanup function to remove the listener.
 */
export function activateFocusTrap(
    container: HTMLElement,
    options: FocusTrapOptions = {}
): () => void {
    const {initialFocus = false} = options;

    const handleKeyDown = (e: KeyboardEvent) => {
        handleFocusTrapKeyDown(container, e);
    };

    container.addEventListener('keydown', handleKeyDown);

    if (initialFocus) {
        const focusable = getFocusableElements(container);
        if (focusable.length > 0) {
            focusable[0].focus();
        }
    }

    return () => {
        container.removeEventListener('keydown', handleKeyDown);
    };
}

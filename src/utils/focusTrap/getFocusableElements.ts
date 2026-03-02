const FOCUSABLE_SELECTOR =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Returns focusable elements inside the container (visible, not disabled).
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
    const nodes = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    return Array.from(nodes).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    );
}

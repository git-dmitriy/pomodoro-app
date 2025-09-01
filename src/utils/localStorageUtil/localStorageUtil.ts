interface StorageUtil {
    setItem<T>(key: string, value: T): void;
    getItem<T>(key: string, defaultValue?: T): T | undefined | null;
    removeItem(key: string): void;
    clear(): void;
    hasKey(key: string): boolean;
}

export const localStorageUtil: StorageUtil = {
    setItem<T>(key: string, value: T): void {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving to localStorage [${key}]:`, error);
        }
    },

    getItem<T>(key: string, defaultValue?: T): T | undefined {
        try {
            const stored = window.localStorage.getItem(key);
            if (stored === null) {
                return defaultValue;
            }
            return JSON.parse(stored) as T;
        } catch (error) {
            console.error(`Error reading from localStorage [${key}]:`, error);
            return defaultValue;
        }
    },

    removeItem(key: string): void {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing localStorage key [${key}]:`, error);
        }
    },

    clear(): void {
        try {
            window.localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorageUtil:', error);
        }
    },

    hasKey(key: string): boolean {
        try {
            return window.localStorage.getItem(key) !== null;
        } catch {
            return false;
        }
    }
};
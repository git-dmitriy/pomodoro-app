import {Dispatch, SetStateAction, useState} from 'react';
import {localStorageUtil} from '@/utils/localStorageUtil';

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = localStorageUtil.getItem<T>(key, initialValue);
            return item ?? initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue: Dispatch<SetStateAction<T>> = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                localStorageUtil.setItem<T>(key, valueToStore);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return [storedValue, setValue];
}

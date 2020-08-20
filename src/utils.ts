import { useState, useCallback } from 'react';

export function randomString(strLength: number): string {
    const result = [];
    const charSet = '0123456789';
    while (strLength--) {
        result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
    }
    return result.join('');
}

export function useArrayState<T>(
    initializeValue: T[] = [],
): [T[], (value: T) => void, () => void] {
    const [array, setter] = useState<T[]>(initializeValue);
    const appendValue = useCallback(
        (value: T) => {
            const newValue = array.concat(value);
            setter(newValue);
        },
        [array],
    );
    const clearValue = useCallback(() => {
        setter([]);
    }, []);
    return [array, appendValue, clearValue];
}

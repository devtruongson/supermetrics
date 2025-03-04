import { useEffect, useState } from 'react';

export default function useDebounce({ delay, text }: { text: string; delay: number }) {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            setValue(text);
        }, delay);
        return () => {
            clearTimeout(timerId);
        };
    }, [text, delay]);
    return value;
}

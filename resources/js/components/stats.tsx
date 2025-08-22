import { useEffect, useRef, useState } from 'react';

interface RandomNumberProps {
    value: number;
    duration?: number;
}

export function Stats({ value, duration = 2000 }: RandomNumberProps) {
    const [displayValue, setDisplayValue] = useState<number>(0);
    const [start, setStart] = useState<boolean>(false);
    const ref = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const node = ref.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStart(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 },
        );

        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) observer.unobserve(node);
        };
    }, []);

    useEffect(() => {
        if (!start) return;

        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        // eslint-disable-next-line prefer-const
        interval = setInterval(() => {
            setDisplayValue(Math.floor(Math.random() * value));
        }, 100);

        // eslint-disable-next-line prefer-const
        timeout = setTimeout(() => {
            clearInterval(interval);
            setDisplayValue(value);
        }, duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [start, value, duration]);

    return (
        <span
            ref={ref}
            className="block text-center text-4xl font-semibold text-amber-600 tabular-nums sm:text-left sm:text-5xl md:text-6xl lg:text-7xl"
        >
            {displayValue.toLocaleString('id-ID')}
        </span>
    );
}

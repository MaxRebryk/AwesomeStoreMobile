import { useEffect, useRef } from 'react';

export const useDebounceEffect = (
	effect: () => void,
	deps: unknown[],
	delay: number,
) => {
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			effect();
		}, delay);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, deps);
};

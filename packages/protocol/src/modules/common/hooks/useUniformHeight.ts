import { useEffect, useRef, useState } from 'react';

/**
 * this hook is useful for calculating the uniform height by highest element with selector.
 * example of usage: const maxHeight = useUniformHeight('.tab-content');
 * */

export const useUniformHeight = (selector: string) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    observerRef.current = new ResizeObserver(entries => {
      const clientHeights = entries.map(entry => entry.target.clientHeight);
      const maxObservedHeight = Math.max(...clientHeights);

      setMaxHeight(maxObservedHeight);
    });

    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        elements.forEach(element => {
          observerRef.current?.unobserve(element);
        });
        observerRef.current.disconnect();
      }
    };
  }, [selector]);

  return maxHeight;
};

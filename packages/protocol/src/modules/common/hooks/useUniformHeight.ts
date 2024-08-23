import { useEffect, useRef, useState } from 'react';

import { useIsSMDown } from 'uiKit/Theme/useTheme';

/**
 * this hook is useful for calculating the uniform height by highest element with selector.
 * example of usage: const maxHeight = useUniformHeight('.tab-content');
 * */

export const useUniformHeight = (selector: string) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const isSmDown = useIsSMDown();

  useEffect(() => {
    if (isSmDown) {
      setMaxHeight(0);

      return () => {};
    }

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
  }, [selector, isSmDown]);

  return maxHeight;
};

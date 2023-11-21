import { useEffect, useMemo, useState } from 'react';

export const useOnScreen = (element?: HTMLElement | null) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    if (element) {
      observer.observe(element);

      return () => observer.disconnect();
    }

    return () => {};
  }, [observer, element]);

  return isIntersecting;
};

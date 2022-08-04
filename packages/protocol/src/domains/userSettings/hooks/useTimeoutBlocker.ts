import { useEffect, useState } from 'react';

export const useTimeoutBlocker = (ms?: number) => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    setIsBlocked(true);

    const timeoutId = setTimeout(() => {
      setIsBlocked(false);
    }, ms || 0);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [ms]);

  return isBlocked;
};

import { useEffect, useState } from 'react';

export const useTimeoutBlocker = (ms: number, shouldStart: boolean) => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (shouldStart) {
      setIsBlocked(true);

      const timeoutId = setTimeout(() => {
        setIsBlocked(false);
      }, ms || 0);

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    return () => {};
  }, [ms, shouldStart]);

  return isBlocked;
};

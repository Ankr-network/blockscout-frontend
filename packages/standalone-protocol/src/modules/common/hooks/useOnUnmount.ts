import { useEffect } from 'react';

export function useOnUnmount(callback: any) {
  useEffect(() => {
    return () => {
      if (typeof callback !== 'function') return;

      callback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

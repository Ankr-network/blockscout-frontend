import { useEffect, useRef } from 'react';

export default function useInterval(
  callback: (...callbckArgs: any[]) => void,
  delay?: number | null,
  ...args: any[]
) {
  const savedCallback = useRef<(...refArgs: any[]) => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current(...args);
      }
    }
    if (delay !== null && delay !== undefined) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => null;
  }, [delay, args]);
}
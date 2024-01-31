import { useCallback, useEffect, useRef } from 'react';

export interface UseTimoutParams {
  delay: number;
  onTimeout: () => void;
}

export const useTimeout = ({ delay, onTimeout }: UseTimoutParams) => {
  const callback = useRef(onTimeout);
  const timeoutId = useRef<NodeJS.Timeout>();

  const run = useCallback(() => {
    timeoutId.current = setTimeout(callback.current, delay);
  }, [delay]);

  const stop = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, []);

  useEffect(() => {
    callback.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => stop, [stop]);

  return { run, stop };
};

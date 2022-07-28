import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export const useIsDisabledWithTimeout = (ms?: number) => {
  const timeoutID = useRef<NodeJS.Timeout | undefined>(undefined);

  const [isDisabled, setIsDisabled] = useState(false);

  const reset = useCallback(() => {
    if (timeoutID.current) clearTimeout(timeoutID.current);
  }, []);

  useLayoutEffect(() => {
    reset();

    if (ms) {
      setIsDisabled(true);

      timeoutID.current = setTimeout(() => {
        setIsDisabled(false);
      }, ms);
    }

    return reset;
  }, [ms, reset]);

  return isDisabled;
};

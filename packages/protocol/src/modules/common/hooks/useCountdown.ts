import { useCallback, useEffect, useRef, useState } from 'react';

const SECOND = 1000;

export const useCountdown = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRun, setIsRun] = useState(false);

  const intervalId = useRef<NodeJS.Timeout>();

  const run = useCallback(() => {
    const go = () => setSeconds(secs => secs - 1);

    intervalId.current = setInterval(go, SECOND);

    // to run immediately
    go();

    setIsRun(true);
  }, []);

  const stop = useCallback(() => {
    clearInterval(intervalId.current!);

    setIsRun(false);
  }, []);

  const reset = useCallback(
    (secondsToResetWith = initialSeconds) => {
      stop();
      setSeconds(secondsToResetWith);
    },
    [stop, initialSeconds],
  );

  useEffect(() => {
    if (seconds <= 0) {
      stop();
    }
  }, [seconds, stop]);

  useEffect(() => reset, [reset]);

  return { isRun, reset, run, seconds, stop };
};

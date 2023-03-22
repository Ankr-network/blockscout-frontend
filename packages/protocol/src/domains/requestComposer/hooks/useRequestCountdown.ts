import { useCallback } from 'react';

import { useCountdown } from 'modules/common/hooks/useCountdown';

const SECONDS_TO_WAIT_FOR = 30;

export const useRequestCountdown = () => {
  const { isRun, reset, run, seconds } = useCountdown(SECONDS_TO_WAIT_FOR);

  const start = useCallback(() => {
    reset();
    run();
  }, [reset, run]);

  return { isRun, seconds, start };
};

import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { CountdownContext } from 'domains/requestComposer/components/composers/const';

export const useRefreshButton = (refresh: () => void) => {
  const { isRun: isCountdownRun, seconds } = useContext(CountdownContext);

  const [isCountdownEnded, setIsCountdownEnded] = useState(false);
  const wasCountdownRun = useRef(isCountdownRun);

  const onRefresh = useCallback(() => {
    setIsCountdownEnded(false);

    refresh();
  }, [refresh]);

  useEffect(() => {
    setIsCountdownEnded(wasCountdownRun.current && !isCountdownRun);

    wasCountdownRun.current = isCountdownRun;
  }, [isCountdownRun]);

  return { isCountdownRun, isCountdownEnded, onRefresh, seconds };
};

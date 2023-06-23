import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { CountdownContext } from 'domains/requestComposer/components/composers/const';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { IPrivateLastRequestParams } from 'domains/chains/actions/private/fetchPrivateLatestRequests';

export const useRefreshButton = (
  refresh: ({ group }: IPrivateLastRequestParams) => void,
) => {
  const { isRun: isCountdownRun, seconds } = useContext(CountdownContext);

  const [isCountdownEnded, setIsCountdownEnded] = useState(false);
  const wasCountdownRun = useRef(isCountdownRun);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const onRefresh = useCallback(() => {
    setIsCountdownEnded(false);

    refresh({ group });
  }, [refresh, group]);

  useEffect(() => {
    setIsCountdownEnded(wasCountdownRun.current && !isCountdownRun);

    wasCountdownRun.current = isCountdownRun;
  }, [isCountdownRun]);

  return { isCountdownRun, isCountdownEnded, onRefresh, seconds };
};

import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { formatLongNumber } from 'modules/common/utils/formatNumber';
import { ChainID, Timeframe } from 'modules/chains/types';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectProjectTotalRequestsFor1hByChain,
  selectProjectTotalRequestsFor24hByChain,
} from 'domains/projects/store';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useChainRequests = (chainId: ChainID, timeframe: Timeframe) => {
  const lastHourRequests = useAppSelector(state =>
    selectProjectTotalRequestsFor1hByChain(state, chainId),
  );

  const lastDayRequests = useAppSelector(state =>
    selectProjectTotalRequestsFor24hByChain(state, chainId),
  );

  const { hasPremium } = useAuth();

  const requestsString = useMemo(() => {
    if (!hasPremium) {
      return t('projects.list-project.not-available');
    }

    const hasLastHourRequests = lastHourRequests > 0;

    if (timeframe === Timeframe.Hour && hasLastHourRequests) {
      return formatLongNumber(lastHourRequests);
    }

    const hasLastDayRequests = lastDayRequests > 0;

    if (timeframe === Timeframe.Day && hasLastDayRequests) {
      return formatLongNumber(lastDayRequests);
    }

    return t('projects.list-project.no-requests-yet');
  }, [hasPremium, lastDayRequests, lastHourRequests, timeframe]);

  return { requestsString };
};

import { useMemo } from 'react';
import { t } from '@ankr.com/common';
import { ChainID, Timeframe } from '@ankr.com/chains-list';

import { formatLongNumber } from 'modules/common/utils/formatNumber';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectProjectTotalRequestsFor1hByChain,
  selectProjectTotalRequestsFor24hByChain,
} from 'domains/projects/store';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useProjectStatsParams } from 'modules/stats/hooks/useProjectStatsParams';
import { IFetchProjectChainsStatsFor1hParams } from 'domains/projects/actions/fetchProjectChainsStatsFor1h';
import { IFetchProjectChainsStatsFor24hParams } from 'domains/projects/actions/fetchProjectChainsStatsFor24h';

export const useChainRequests = (
  chainId: ChainID,
  timeframe: Timeframe,
  userEndpointToken?: string,
) => {
  const { statsParams } = useProjectStatsParams(userEndpointToken);

  const lastHourRequests = useAppSelector(state =>
    selectProjectTotalRequestsFor1hByChain(
      state,
      chainId,
      statsParams as IFetchProjectChainsStatsFor1hParams,
    ),
  );

  const lastDayRequests = useAppSelector(state =>
    selectProjectTotalRequestsFor24hByChain(
      state,
      chainId,
      statsParams as IFetchProjectChainsStatsFor24hParams,
    ),
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

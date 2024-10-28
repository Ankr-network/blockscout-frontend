import { useMemo } from 'react';
import { t } from '@ankr.com/common';
import { ChainID, Timeframe } from '@ankr.com/chains-list';

import { formatLongNumber } from 'modules/common/utils/formatNumber';
import {
  selectProjectTotalRequestsFor1hByChain,
  selectProjectTotalRequestsFor24hByChain,
} from 'domains/projects/store';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useChainRequests = (
  chainId: ChainID,
  timeframe: Timeframe,
  userEndpointToken?: string,
) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const lastHourRequests = useAppSelector(state =>
    selectProjectTotalRequestsFor1hByChain(state, chainId, {
      group,
      token: userEndpointToken!,
    }),
  );

  const lastDayRequests = useAppSelector(state =>
    selectProjectTotalRequestsFor24hByChain(state, chainId, {
      group,
      token: userEndpointToken!,
    }),
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

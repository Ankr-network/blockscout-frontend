import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { formatLongNumber } from 'modules/common/utils/formatNumber';
import { ChainID } from 'modules/chains/types';
import { useAppSelector } from 'store/useAppSelector';
import {
  selectProjectTotalRequestsFor1hByChain,
  selectProjectTotalRequestsFor24hByChain,
} from 'domains/projects/store';

export const useChainRequests = (chainId: ChainID) => {
  const lastHourRequests = useAppSelector(state =>
    selectProjectTotalRequestsFor1hByChain(state, chainId),
  );

  const lastDayRequests = useAppSelector(state =>
    selectProjectTotalRequestsFor24hByChain(state, chainId),
  );

  const requestsString = useMemo(() => {
    const hasLastHourRequests = lastHourRequests > 0;
    const hasLastDayRequests = lastDayRequests > 0;

    const hasRequests = hasLastHourRequests || hasLastDayRequests;

    if (!hasRequests) {
      return t('project.chain-details.requests.no-requests');
    }

    return t('project.chain-details.requests.has-requests', {
      hourRequests: formatLongNumber(lastHourRequests),
      dayRequests: formatLongNumber(lastDayRequests),
    });
  }, [lastDayRequests, lastHourRequests]);

  return { requestsString };
};

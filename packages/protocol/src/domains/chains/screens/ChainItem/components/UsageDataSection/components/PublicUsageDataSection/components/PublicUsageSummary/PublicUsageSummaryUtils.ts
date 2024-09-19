import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import { formatTotalRequests } from 'domains/chains/utils//formatTotalRequests';
import { getRequestsAverage } from 'domains/chains/utils/getRequestsAverage';

import { getCachedRequestsPercent } from './utils/getCachedRequestsPercent';

export interface UsageSummaryParams {
  cachedRequests?: BigNumber;
  timeframe: Timeframe;
  totalRequests: BigNumber;
}

export const useUsageSummary = ({
  cachedRequests,
  timeframe,
  totalRequests,
}: UsageSummaryParams) =>
  useMemo(
    () => ({
      total: formatTotalRequests(totalRequests),
      average: getRequestsAverage(totalRequests, timeframe),
      cached: getCachedRequestsPercent(totalRequests, cachedRequests),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cachedRequests, totalRequests],
  );

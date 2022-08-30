import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { Timeframe } from 'domains/chains/types';
import { formatTotalRequests } from '../utils/formatTotalRequests';
import { getCachedRequestsPercent } from '../utils/getCachedRequestsPercent';
import { getRequestsAverage } from '../utils/getRequestsAverage';
import { getTotalCost } from '../utils/getTotalCost';

export interface UsageSummaryParams {
  cachedRequests: BigNumber;
  timeframe: Timeframe;
  totalCost?: number;
  totalRequests: BigNumber;
}

export type UsageSummary = [string, string, string, string];

export const useUsageSummary = ({
  cachedRequests,
  timeframe,
  totalCost,
  totalRequests,
}: UsageSummaryParams) =>
  useMemo<UsageSummary>(
    () => [
      formatTotalRequests(totalRequests),
      getRequestsAverage(totalRequests, timeframe),
      getCachedRequestsPercent(totalRequests, cachedRequests),
      getTotalCost(totalCost),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cachedRequests, totalRequests, totalCost],
  );

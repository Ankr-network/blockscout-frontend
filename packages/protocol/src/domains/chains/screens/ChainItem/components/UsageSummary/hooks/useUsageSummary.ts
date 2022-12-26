import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { Timeframe } from 'domains/chains/types';
import { formatTotalRequests } from '../utils/formatTotalRequests';
import { getRequestsAverage } from '../utils/getRequestsAverage';

export interface UsageSummaryParams {
  timeframe: Timeframe;
  totalRequests: BigNumber;
}

export type UsageSummary = [string, string];

export const useUsageSummary = ({
  timeframe,
  totalRequests,
}: UsageSummaryParams) =>
  useMemo<UsageSummary>(
    () => [
      formatTotalRequests(totalRequests),
      getRequestsAverage(totalRequests, timeframe),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalRequests],
  );

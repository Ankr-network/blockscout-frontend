import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { Timeframe } from 'domains/chains/types';
import { t } from '@ankr.com/common';
import { getRequestsAverage } from '../PublicUsageSummary/utils/getRequestsAverage';
import { formatTotalRequests } from '../PublicUsageSummary/utils/formatTotalRequests';

export const getTotalCost = (cost = 0) =>
  t('chain-item.usage-data.usage-summary.cost.value', { cost });

export interface UsageSummaryParams {
  timeframe: Timeframe;
  totalCost?: number;
  totalRequests: BigNumber;
}

export const useUsageSummary = ({
  timeframe,
  totalCost,
  totalRequests,
}: UsageSummaryParams) => {
  return useMemo(
    () => ({
      total: formatTotalRequests(totalRequests),
      average: getRequestsAverage(totalRequests, timeframe),
      cost: t('chain-item.usage-data.usage-summary.cost.value', {
        cost: totalCost,
      }),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalRequests, totalCost],
  );
};

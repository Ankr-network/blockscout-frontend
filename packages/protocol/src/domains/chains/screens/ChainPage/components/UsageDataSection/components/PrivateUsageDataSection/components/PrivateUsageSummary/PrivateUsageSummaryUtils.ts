import BigNumber from 'bignumber.js';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';
import { Timeframe } from '@ankr.com/chains-list';

import { formatTotalRequests } from 'domains/chains/utils/formatTotalRequests';
import { getRequestsAverage } from 'domains/chains/utils/getRequestsAverage';

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

import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { Timeframe } from 'domains/chains/types';
import { t } from '@ankr.com/common';
import { getRequestsAverage } from '../../../PublicUsageDataSection/components/PublicUsageSummary/utils/getRequestsAverage';
import { formatTotalRequests } from '../../../PublicUsageDataSection/components/PublicUsageSummary/utils/formatTotalRequests';

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

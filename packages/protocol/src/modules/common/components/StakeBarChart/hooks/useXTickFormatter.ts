import { BlockchainStatsTopRequestsData } from 'multirpc-sdk';
import { Timeframe } from '@ankr.com/chains-list';
import { useCallback } from 'react';

import { NUMBER_OF_SHOW_X_TICK } from '../StakeBarChartUtils';

export const useXTickFormatter = (
  timeframe: Timeframe,
  data: BlockchainStatsTopRequestsData[],
) => {
  return useCallback(
    (value: string, index: number) => {
      const totalNum = data.length;

      if (totalNum < NUMBER_OF_SHOW_X_TICK) {
        return value;
      }

      if (timeframe !== Timeframe.Week) {
        // in 24 hours' and 30 days' diagram, we need to show 4 date label on the x-axis, and we should keep the same space between each date label.
        const hideNum = Math.floor(
          (totalNum - 1) / (NUMBER_OF_SHOW_X_TICK - 1),
        );
        const hasOverflow = index > (NUMBER_OF_SHOW_X_TICK - 2) * hideNum;

        return (index % hideNum === 0 && !hasOverflow) || index === totalNum - 1
          ? value
          : '';
      }

      return value;
    },
    [timeframe, data],
  );
};

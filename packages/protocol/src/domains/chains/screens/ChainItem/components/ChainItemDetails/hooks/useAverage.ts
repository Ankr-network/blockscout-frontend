import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { StatsTimeframe } from 'domains/chains/types';
import { getAvarageRequests } from '../ChainItemDetailsUtils';

export interface AverageParams {
  timeframe: StatsTimeframe;
  totalRequests?: BigNumber;
}

export const useAverage = ({
  totalRequests,
  timeframe: timeframe_,
}: AverageParams) => {
  const [timeframe, setTimeframe] = useState(timeframe_);

  useEffect(() => {
    setTimeframe(timeframe_);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalRequests]);

  return getAvarageRequests(timeframe, totalRequests);
};

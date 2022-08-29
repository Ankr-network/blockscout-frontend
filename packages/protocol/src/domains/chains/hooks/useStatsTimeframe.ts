import { StatsTimeframe } from 'domains/chains/types';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';
import { useEffect, useState } from 'react';
import { IS_30D_PRIVATE_STATISTICS_DISABLED } from '../screens/ChainItem/components/ChainRequestsOverview';

const { DAY, WEEK, MONTH } = StatsTimeframe;

const connectedItems: StatsTimeframe[] = IS_30D_PRIVATE_STATISTICS_DISABLED
  ? [DAY, WEEK]
  : [DAY, WEEK, MONTH];

const defaultItems: StatsTimeframe[] = [MONTH, DAY, WEEK];

export const useStatsTimeframe = (isWalletConnected: boolean) => {
  const items = isWalletConnected ? connectedItems : defaultItems;

  return useSwitcher({ items, resetDeps: [isWalletConnected] });
};

export const useTimeframe = (timeframe_: StatsTimeframe, depends: any[]) => {
  const [timeframe, setTimeframe] = useState(timeframe_);

  useEffect(() => {
    setTimeframe(timeframe_);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depends);

  return {
    timeframe,
  };
};

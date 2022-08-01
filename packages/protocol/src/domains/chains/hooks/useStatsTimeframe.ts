import { StatsTimeframe } from 'domains/chains/types';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

const { DAY, WEEK, MONTH } = StatsTimeframe;

const connectedItems: StatsTimeframe[] = [DAY, WEEK, MONTH];
const defaultItems: StatsTimeframe[] = [MONTH, DAY, WEEK];

export const useStatsTimeframe = (isWalletConnected: boolean) => {
  const items = isWalletConnected ? connectedItems : defaultItems;

  return useSwitcher({ items, resetDeps: [isWalletConnected] });
};

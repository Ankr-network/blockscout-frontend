import { StatsTimeframe } from 'domains/chains/types';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

const { DAY, WEEK, MONTH } = StatsTimeframe;

const items: StatsTimeframe[] = [MONTH, DAY, WEEK];

export const useStatsTimeframe = (isWalletConnected: boolean) =>
  useSwitcher({ items, resetDeps: [isWalletConnected] });

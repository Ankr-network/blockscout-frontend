import { useSwitcher } from 'modules/common/hooks/useSwitcher';
import { StatsTimeframe } from 'domains/chains/types';

const { DAY, WEEK, MONTH } = StatsTimeframe;

const items: StatsTimeframe[] = [MONTH, DAY, WEEK];

export const useStatsTimeframe = (isWalletConnected: boolean) =>
  useSwitcher({ items, resetDeps: [isWalletConnected] });

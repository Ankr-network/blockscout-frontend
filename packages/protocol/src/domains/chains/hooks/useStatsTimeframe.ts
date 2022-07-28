import { StatsTimeframe } from 'domains/chains/types';
import { useSwitcher } from 'modules/common/hooks/useSwitcher';

const { DAY, WEEK, MONTH } = StatsTimeframe;

const items: StatsTimeframe[] = [DAY, WEEK, MONTH];

export const useStatsTimeframe = (isWalletConnected: boolean) =>
  useSwitcher({ items, resetDeps: [isWalletConnected] });

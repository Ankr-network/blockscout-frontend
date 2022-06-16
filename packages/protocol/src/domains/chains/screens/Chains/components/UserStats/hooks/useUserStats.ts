import { Stats, Timeframe } from '../types';
import { useStats } from './useStats';
import { useTimeframe } from './useTimeframe';

export interface UserStats {
  isLoading: boolean;
  stats: Stats;
  switchTimeframe: () => void;
  timeframe: Timeframe;
}

export const useUserStats = () => {
  const [timeframe, switchTimeframe] = useTimeframe();

  const { isLoading, stats } = useStats(timeframe);

  return {
    isLoading,
    stats,
    switchTimeframe,
    timeframe,
  };
};

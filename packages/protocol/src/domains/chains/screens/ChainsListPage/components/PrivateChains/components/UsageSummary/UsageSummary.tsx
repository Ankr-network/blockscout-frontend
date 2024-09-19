import { Timeframe } from '@ankr.com/chains-list';

import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { useStats } from './hooks/useStats';
import { useStyles } from './UsageSummaryStyles';

export interface UsageSummaryProps {
  switchTimeframe: () => void;
  timeframe: Timeframe;
}

export const UsageSummary = ({
  switchTimeframe,
  timeframe,
}: UsageSummaryProps) => {
  const [stats, loading] = useStats();

  const { classes } = useStyles();

  return (
    <div className={classes.userStats}>
      <Header timeframe={timeframe} switchTimeframe={switchTimeframe} />
      <Stats isLoading={loading} stats={stats} />
    </div>
  );
};

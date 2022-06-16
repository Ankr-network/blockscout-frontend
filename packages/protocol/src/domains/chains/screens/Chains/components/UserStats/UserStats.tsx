import React from 'react';
import classNames from 'classnames';

import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { useStyles } from './UserStatsStyles';
import { useUserStats } from './hooks/useUserStats';

export interface UserStatsProps {
  className?: string;
}

export const UserStats = ({ className }: UserStatsProps) => {
  const { isLoading, stats, switchTimeframe, timeframe } = useUserStats();

  const classes = useStyles();

  return (
    <div className={classNames(className, classes.userStats)}>
      <Header timeframe={timeframe} switchTimeframe={switchTimeframe} />
      <Stats isLoading={isLoading} stats={stats} />
    </div>
  );
};

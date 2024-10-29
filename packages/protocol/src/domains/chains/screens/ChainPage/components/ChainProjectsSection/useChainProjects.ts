import { Timeframe } from '@ankr.com/chains-list';

import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';

import { useTimeframe } from '../ChainItemSections/hooks/useTimeframe';

export const useChainProjects = () => {
  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes: [Timeframe.Hour, Timeframe.Day],
  });

  const { jwts, jwtsLoading, shouldShowTokenManager } = useJWTsManager();

  return {
    jwts,
    jwtsLoading,
    shouldShowTokenManager,
    timeframe,
    timeframeTabs,
  };
};

import { Timeframe } from '@ankr.com/chains-list';
import { useMemo } from 'react';

import { FetchPrivateStatsParams } from 'domains/chains/actions/private/fetchPrivateStats';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export interface IUseChainCallsProps {
  timeframe: Timeframe;
}

export const usePrivateStatsParams = ({ timeframe }: IUseChainCallsProps) => {
  const interval = timeframeToIntervalMap[timeframe];
  const { selectedProject: userEndpointToken } =
    useTokenManagerConfigSelector();

  const privateStatsParams = useMemo(
    (): FetchPrivateStatsParams => ({ interval, userEndpointToken }),
    [interval, userEndpointToken],
  );

  return { privateStatsParams };
};

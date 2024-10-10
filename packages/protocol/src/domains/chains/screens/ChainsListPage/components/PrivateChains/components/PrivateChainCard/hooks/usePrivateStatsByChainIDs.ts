import { useMemo } from 'react';
import { ChainID, Timeframe } from '@ankr.com/chains-list';

import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePrivateStats } from 'domains/chains/hooks/usePrivateStats';

import { aggregateTotalRequestsNumber } from '../../../utils/aggregateTotalRequestsNumber';

export interface IUsePrivateStatsByChainIDsProps {
  ids: ChainID[];
  timeframe: Timeframe;
}

const defaultStats = {};

export const usePrivateStatsByChainIDs = ({
  ids,
  timeframe,
}: IUsePrivateStatsByChainIDsProps) => {
  const {
    arePrivateStatsLoading: isLoading,
    data: { stats = defaultStats },
  } = usePrivateStats({
    hasGateway: false,
    interval: timeframeToIntervalMap[timeframe],
    userEndpointToken: undefined,
  });

  const result = useMemo(
    () => aggregateTotalRequestsNumber({ ids, stats }),
    [ids, stats],
  );

  return [result, isLoading] as const;
};

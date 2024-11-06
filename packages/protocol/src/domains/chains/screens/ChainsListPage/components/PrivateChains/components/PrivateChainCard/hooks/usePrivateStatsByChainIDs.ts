import { useMemo } from 'react';
import { ChainID, Timeframe } from '@ankr.com/chains-list';

import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { usePrivateStats } from 'modules/stats/hooks/usePrivateStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

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
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const interval = timeframeToIntervalMap[timeframe];

  const {
    loading,
    privateStats: { stats = defaultStats },
  } = usePrivateStats({ group, interval });

  const result = useMemo(
    () => aggregateTotalRequestsNumber({ ids, stats }),
    [ids, stats],
  );

  return [result, loading] as const;
};

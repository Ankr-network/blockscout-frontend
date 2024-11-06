import { Timeframe } from '@ankr.com/chains-list';

import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export interface IUsePrivateStatsParams {
  timeframe: Timeframe;
}

export const usePrivateStatsParams = ({
  timeframe,
}: IUsePrivateStatsParams) => {
  const interval = timeframeToIntervalMap[timeframe];
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { selectedProject } = useTokenManagerConfigSelector();

  return { group, interval, selectedProject };
};

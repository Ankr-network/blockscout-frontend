import {
  PrivateStatsInterval,
  StatsByRangeDuration,
  StatsByRangeTimeframe,
} from 'multirpc-sdk';

import { usePrivateStats } from 'modules/stats/hooks/usePrivateStats';
import { usePrivateTotalStatsByRange } from 'modules/stats/hooks/usePrivateTotalStatsByRange';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useChainsStatsInitializer = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  usePrivateStats({ group, interval: PrivateStatsInterval.TWO_DAYS });

  usePrivateStats({ group, interval: PrivateStatsInterval.DAY });

  usePrivateStats({ group, interval: PrivateStatsInterval.HOUR });

  usePrivateTotalStatsByRange({
    group,
    duration: StatsByRangeDuration.TWO_HOURS,
    timeframe: StatsByRangeTimeframe.FIVE_MINUTES,
  });
};

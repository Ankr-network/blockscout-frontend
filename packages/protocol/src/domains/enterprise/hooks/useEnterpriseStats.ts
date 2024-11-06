import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';

import { useEnterprisePrivateStats } from 'modules/stats/hooks/useEnterprisePrivateStats';
import { useEnterprisePrivateStatsByToken } from 'modules/stats/hooks/useEnterprisePrivateStatsByToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useEnterpriseSelectedToken } from './useEnterpriseSelectedToken';

export interface IUseEnterpriseStatsProps {
  interval: PrivateStatsInterval;
  shouldFetch?: boolean;
}

const defaultStats: PrivateStats = {};

export const useEnterpriseStats = ({
  interval,
  shouldFetch,
}: IUseEnterpriseStatsProps) => {
  const { userEndpointToken } = useEnterpriseSelectedToken();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const {
    enterprisePrivateStats: { stats: totalStats = defaultStats },
    loading: totalStatsLoading,
    state: { error: totalStatsError },
  } = useEnterprisePrivateStats({
    group,
    interval,
    skipFetching: Boolean(userEndpointToken) || !shouldFetch,
  });

  const {
    loading: statsByApiKeyLoading,
    privateStats: { stats: statsByApiKey = defaultStats },
    state: { error: statsByApiKeyError },
  } = useEnterprisePrivateStatsByToken({
    group,
    interval,
    skipFetching: !userEndpointToken || !shouldFetch,
    token: userEndpointToken!,
  });

  const [stats, loading, error] = userEndpointToken
    ? ([statsByApiKey, statsByApiKeyLoading, statsByApiKeyError] as const)
    : ([totalStats, totalStatsLoading, totalStatsError] as const);

  return { error, loading, stats };
};

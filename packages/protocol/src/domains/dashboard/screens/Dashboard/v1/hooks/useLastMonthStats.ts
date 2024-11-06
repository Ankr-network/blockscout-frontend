import { PrivateStatsInterval } from 'multirpc-sdk';

import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { usePrivateStats } from 'modules/stats/hooks/usePrivateStats';
import { usePrivateStatsByToken } from 'modules/stats/hooks/usePrivateStatsByToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export const useLastMonthStats = (isChainSelected: boolean) => {
  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  const skipFetching =
    isEnterpriseClient || isEnterpriseStatusLoading || isChainSelected;

  usePrivateStatsByToken({
    group,
    interval: PrivateStatsInterval.MONTH,
    token: selectedProjectEndpointToken!,
    skipFetching: !selectedProjectEndpointToken || skipFetching,
  });

  usePrivateStats({
    group,
    interval: PrivateStatsInterval.MONTH,
    skipFetching: Boolean(selectedProjectEndpointToken) || skipFetching,
  });
};

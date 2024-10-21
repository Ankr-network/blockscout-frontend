import { useEffect } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useLazyFetchMonthlyUsageHistoryQuery } from 'domains/dashboard/actions/fetchMonthlyUsageHistory';
import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';

export const useMonthlyStats = () => {
  const [fetch, { data, isLoading }] = useLazyFetchMonthlyUsageHistoryQuery();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  const { gateway, isEnterpriseStatusLoading } = useMultiServiceGateway();

  useEffect(() => {
    if (!isEnterpriseStatusLoading) {
      fetch({ group, token: selectedProjectEndpointToken, gateway });
    }
  }, [
    fetch,
    group,
    selectedProjectEndpointToken,
    gateway,
    isEnterpriseStatusLoading,
  ]);

  return { data, isLoading };
};

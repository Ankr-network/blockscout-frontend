import { useEffect } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useLazyFetchMonthlyUsageHistoryQuery } from 'domains/dashboard/actions/fetchMonthlyUsageHistory';

export const useMonthlyStats = () => {
  const [fetch, { data, isLoading }] = useLazyFetchMonthlyUsageHistoryQuery();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  useEffect(() => {
    fetch({ group, token: selectedProjectEndpointToken });
  }, [fetch, group, selectedProjectEndpointToken]);

  return {
    data,
    isLoading,
  };
};

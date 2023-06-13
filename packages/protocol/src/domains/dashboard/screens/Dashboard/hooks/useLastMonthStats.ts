import { useEffect } from 'react';

import { useLazyFetchLastMonthStatsQuery } from 'domains/dashboard/actions/fetchLastMonthStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export const useLastMonthStats = (isChainSelected: boolean) => {
  const [fetch] = useLazyFetchLastMonthStatsQuery();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  useEffect(() => {
    if (!isChainSelected) {
      fetch({ group, userEndpointToken: selectedProjectEndpointToken });
    }
  }, [fetch, group, isChainSelected, selectedProjectEndpointToken]);
};

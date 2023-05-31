import { useEffect } from 'react';

import { useLazyFetchLastMonthStatsQuery } from 'domains/dashboard/actions/fetchLastMonthStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export const useLastMonthStats = (isChainSelected: boolean) => {
  const [fetch] = useLazyFetchLastMonthStatsQuery();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { selectedProject: userEndpointToken } =
    useTokenManagerConfigSelector();

  useEffect(() => {
    if (!isChainSelected) {
      fetch({ group, userEndpointToken });
    }
  }, [fetch, group, isChainSelected, userEndpointToken]);
};

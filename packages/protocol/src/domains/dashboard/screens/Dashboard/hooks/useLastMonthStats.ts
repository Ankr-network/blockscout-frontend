import { useEffect, useRef } from 'react';

import { useLazyFetchLastMonthStatsQuery } from 'domains/dashboard/actions/fetchLastMonthStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export const useLastMonthStats = (isChainSelected: boolean) => {
  const [fetch] = useLazyFetchLastMonthStatsQuery();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  const groupRef = useRef(group);

  useEffect(() => {
    const isGroupChanged = groupRef.current !== group;

    if (!isChainSelected) {
      if (isGroupChanged) {
        groupRef.current = group;
        fetch({ group });
      }
      fetch({ group, userEndpointToken: selectedProjectEndpointToken });
    }
  }, [fetch, group, isChainSelected, selectedProjectEndpointToken]);
};

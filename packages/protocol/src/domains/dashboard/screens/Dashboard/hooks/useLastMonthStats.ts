import { useEffect, useRef } from 'react';

import { useLazyFetchLastMonthStatsQuery } from 'domains/dashboard/actions/fetchLastMonthStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';

export const useLastMonthStats = (isChainSelected: boolean) => {
  const { gateway, isEnterpriseStatusLoading } = useMultiServiceGateway();
  const [fetch] = useLazyFetchLastMonthStatsQuery();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  const groupRef = useRef(group);

  useEffect(() => {
    const isGroupChanged = groupRef.current !== group;

    if (!isChainSelected && !isEnterpriseStatusLoading) {
      if (isGroupChanged) {
        groupRef.current = group;
        fetch({ group, gateway });
      }

      fetch({
        group,
        userEndpointToken: selectedProjectEndpointToken,
        gateway,
      });
    }
  }, [
    fetch,
    group,
    isChainSelected,
    selectedProjectEndpointToken,
    gateway,
    isEnterpriseStatusLoading,
  ]);
};

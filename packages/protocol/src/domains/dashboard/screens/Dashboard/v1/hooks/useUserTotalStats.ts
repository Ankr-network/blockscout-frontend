import { useEffect } from 'react';

import { useMultiServiceGateway } from 'domains/dashboard/hooks/useMultiServiceGateway';
import { useLazyFetchUserTotalStatsQuery } from 'domains/dashboard/actions/fetchUserTotalStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useUserTotalStats = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { gateway, isEnterpriseStatusLoading } = useMultiServiceGateway();

  const [fetch, { isLoading }] = useLazyFetchUserTotalStatsQuery();

  useEffect(() => {
    if (!isEnterpriseStatusLoading) {
      const { abort } = fetch({ group, gateway });

      return abort;
    }

    return () => {};
  }, [group, fetch, gateway, isEnterpriseStatusLoading]);

  return { isLoading };
};

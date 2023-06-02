import { useEffect } from 'react';

import { useLazyFetchUserTotalStatsQuery } from 'domains/dashboard/actions/fetchUserTotalStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useUserTotalStats = () => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [fetch] = useLazyFetchUserTotalStatsQuery();

  useEffect(() => {
    const { unsubscribe } = fetch({ group });

    return unsubscribe;
  }, [fetch, group]);
};

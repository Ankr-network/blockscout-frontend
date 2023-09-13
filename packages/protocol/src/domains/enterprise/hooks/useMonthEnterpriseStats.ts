import { PrivateStats } from 'multirpc-sdk';
import { useEffect } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useLazyChainsFetchMonthEnterpriseStatsQuery } from '../actions/fetchMonthEnterpriseStats';

export const useMonthEnterpriseStats = (): [PrivateStats, boolean] => {
  const [fetchMonthEnterpriseStats, { data: stats = {}, isLoading }] =
    useLazyChainsFetchMonthEnterpriseStatsQuery();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => {
    fetchMonthEnterpriseStats({ group });
  }, [fetchMonthEnterpriseStats, group]);

  return [stats, isLoading];
};

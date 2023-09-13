import { useEffect } from 'react';
import { PrivateStatsInterval } from 'multirpc-sdk';

import { useLazyChainsFetchEnterpriseStatsQuery } from '../actions/fetchEnterpriseStats';
import { useEnterpriseSelectedToken } from './useEnterpriseSelectedToken';

const interval = PrivateStatsInterval.MONTH;

export const useEnterpriseStats = (shouldFetch?: boolean) => {
  const { userEndpointToken } = useEnterpriseSelectedToken();

  const [fetchEnterpriseStats] = useLazyChainsFetchEnterpriseStatsQuery();

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    fetchEnterpriseStats({
      interval,
      userEndpointToken,
    });
  }, [shouldFetch, fetchEnterpriseStats, userEndpointToken]);
};

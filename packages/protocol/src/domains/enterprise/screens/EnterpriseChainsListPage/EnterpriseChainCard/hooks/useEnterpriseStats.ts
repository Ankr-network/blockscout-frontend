import { ChainID } from '@ankr.com/chains-list';
import { PrivateStatsInterval } from 'multirpc-sdk';
import { useMemo } from 'react';

import { aggregateTotalRequestsNumber } from 'domains/chains/screens/ChainsListPage/components/PrivateChains/utils/aggregateTotalRequestsNumber';
import { useEnterpriseStats as useFetchEnterpriseStats } from 'domains/enterprise/hooks/useEnterpriseStats';

export const useEnterpriseStats = (ids: ChainID[]) => {
  const { loading, stats } = useFetchEnterpriseStats({
    interval: PrivateStatsInterval.MONTH,
    shouldFetch: false,
  });

  const result = useMemo(
    () => aggregateTotalRequestsNumber({ ids, stats }),
    [ids, stats],
  );

  return [result, loading] as const;
};

import { useMemo } from 'react';

import { ChainID } from 'domains/chains/types';
import { aggregateTotalRequestsNumber } from 'domains/chains/screens/Chains/components/PrivateChains/utils/aggregateTotalRequestsNumber';
import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseStats } from 'domains/enterprise/store/selectors';

export const useEnterpriseStats = (ids: ChainID[]) => {
  const { data: { stats = {} } = {}, isLoading } = useAppSelector(
    selectEnterpriseStats,
  );

  const result = useMemo(
    () => aggregateTotalRequestsNumber({ ids, stats }),
    [ids, stats],
  );

  return [result, isLoading] as const;
};

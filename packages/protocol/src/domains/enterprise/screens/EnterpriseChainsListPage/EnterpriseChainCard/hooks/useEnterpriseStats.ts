import { useMemo } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { aggregateTotalRequestsNumber } from 'domains/chains/screens/ChainsListPage/components/PrivateChains/utils/aggregateTotalRequestsNumber';
import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseStatsBySelectedApiKey } from 'domains/enterprise/store/selectors';

export const useEnterpriseStats = (ids: ChainID[]) => {
  const { data: { stats = {} } = {}, isLoading } = useAppSelector(
    selectEnterpriseStatsBySelectedApiKey,
  );

  const result = useMemo(
    () => aggregateTotalRequestsNumber({ ids, stats }),
    [ids, stats],
  );

  return [result, isLoading] as const;
};

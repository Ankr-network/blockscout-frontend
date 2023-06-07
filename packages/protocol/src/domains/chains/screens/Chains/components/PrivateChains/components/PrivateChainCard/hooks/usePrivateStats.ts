import { useMemo } from 'react';

import { ChainID } from 'domains/chains/types';
import { aggregateTotalRequestsNumber } from '../../../utils/aggregateTotalRequestsNumber';
import { chainsFetchPrivateStats } from 'domains/chains/actions/private/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export const usePrivateStats = (ids: ChainID[]) => {
  const [, { data: { stats = {} } = {}, isLoading }] = useQueryEndpoint(
    chainsFetchPrivateStats,
  );

  const result = useMemo(
    () => aggregateTotalRequestsNumber({ ids, stats }),
    [ids, stats],
  );

  return [result, isLoading] as const;
};

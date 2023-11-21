import { useMemo } from 'react';

import { ChainID } from 'modules/chains/types';
import { chainsFetchPrivateStats } from 'domains/chains/actions/private/fetchPrivateStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { aggregateTotalRequestsNumber } from '../../../utils/aggregateTotalRequestsNumber';

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

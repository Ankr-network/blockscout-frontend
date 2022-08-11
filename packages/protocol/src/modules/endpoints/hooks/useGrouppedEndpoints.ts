import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { chainGroups } from '../constants/groups';
import { GroupedEndpoints } from '../types';
import { getGroupedEndpoints } from '../utils/getGroupedEndpoints';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useGroupedEndpoints = (chain: IApiChain): GroupedEndpoints => {
  const chainId = chain.id;

  const { isWalletConnected } = useAuth();
  const endpoints = useMemo(
    () => getGroupedEndpoints(chain, chainGroups),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isWalletConnected ? chain : chainId],
  );

  return endpoints;
};

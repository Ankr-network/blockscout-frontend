import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPublicChainsInfo } from 'domains/chains/actions/fetchPublicChainsInfo';
import { IApiChain } from 'domains/chains/api/queryChains';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

export type PublicChains = [IApiChain[], IApiChain[], boolean];

export const usePublicChains = (): PublicChains => {
  const {
    data: { chains = [], allChains = [] },
    loading,
  } = useQuery({
    defaultData: {},
    type: fetchPublicChainsInfo,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPublicChainsInfo());
  }, [dispatch]);

  useOnUnmount(() => {
    dispatch(resetRequests([fetchPublicChainsInfo.toString()]));
  });

  return [chains, allChains, loading];
};

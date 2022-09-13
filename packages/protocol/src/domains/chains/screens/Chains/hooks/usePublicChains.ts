import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { IJwtToken } from 'multirpc-sdk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPublicChainsInfo } from 'domains/chains/actions/fetchPublicChainsInfo';
import { IApiChain } from 'domains/chains/api/queryChains';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

export type PublicChains = [IApiChain[], IApiChain[], boolean];

export const usePublicChains = (token?: IJwtToken): PublicChains => {
  const {
    data: { chains = [], allChains = [] },
    loading,
  } = useQuery({
    defaultData: {},
    type: fetchPublicChainsInfo,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(fetchPublicChainsInfo());
    }
  }, [token, dispatch]);

  useOnUnmount(() => {
    dispatch(resetRequests([fetchPublicChainsInfo.toString()]));
  });

  return [chains, allChains, loading];
};

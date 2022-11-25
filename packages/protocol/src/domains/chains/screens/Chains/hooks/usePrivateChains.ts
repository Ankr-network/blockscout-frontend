import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import { IJwtToken } from 'multirpc-sdk';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPrivateChainsInfo } from 'domains/chains/actions/fetchPrivateChainsInfo';
import { IApiChain } from 'domains/chains/api/queryChains';

export type PrivateChains = [IApiChain[], IApiChain[], boolean];

export const usePrivateChains = (token?: IJwtToken): PrivateChains => {
  const {
    data: { chains = [], allChains = [] },
    loading,
  } = useQuery({
    defaultData: {},
    type: fetchPrivateChainsInfo,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchPrivateChainsInfo());
    }

    return () => {
      dispatch(resetRequests([fetchPrivateChainsInfo.toString()]));
    };
  }, [dispatch, token]);

  return [chains, allChains, loading];
};

import { IJwtToken } from 'multirpc-sdk';
import { resetRequests } from '@redux-requests/core';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useQuery } from '@redux-requests/react';

import { fetchPrivateChainsInfo } from 'domains/chains/actions/fetchPrivateChainsInfo';
import { IApiChain } from 'domains/chains/api/queryChains';

export type PrivateChains = [IApiChain[], boolean];

export const usePrivateChains = (token?: IJwtToken): PrivateChains => {
  const { data: chains, loading } = useQuery({
    defaultData: [],
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

  return [chains, loading];
};

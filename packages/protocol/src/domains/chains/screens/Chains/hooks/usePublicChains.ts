import { resetRequests } from '@redux-requests/core';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useQuery } from '@redux-requests/react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { fetchPublicChainsInfo } from 'domains/chains/actions/fetchPublicChainsInfo';
import { useOnUnmount } from 'modules/common/hooks/useOnUnmount';

export const usePublicChains = (): [IApiChain[], boolean] => {
  const { data: chains, loading } = useQuery<IApiChain[]>({
    defaultData: [],
    type: fetchPublicChainsInfo,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPublicChainsInfo());
  }, [dispatch]);

  useOnUnmount(() => {
    dispatch(resetRequests([fetchPublicChainsInfo.toString()]));
  });

  return [chains, loading];
};

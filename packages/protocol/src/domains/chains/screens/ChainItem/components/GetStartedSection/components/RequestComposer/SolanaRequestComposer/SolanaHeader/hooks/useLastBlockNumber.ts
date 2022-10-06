import { stopPolling } from '@redux-requests/core';
import { useDispatch } from 'react-redux';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { fetchSolanaLastBlockNumber } from 'domains/requestComposer/actions/solana/fetchSolanaLastBlockNumber';

export const useLastBlockNumber = (url: string): [number, boolean] => {
  const { data = 0, loading } = useQuery({ type: fetchSolanaLastBlockNumber });

  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    dispatchRequest(fetchSolanaLastBlockNumber(url));

    return () => {
      dispatch(stopPolling([fetchSolanaLastBlockNumber.toString()]));
    };
  }, [dispatch, dispatchRequest, url]);

  return [data, loading];
};

import { useEffect } from 'react';

import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchSolanaLastBlockNumber } from 'domains/requestComposer/actions/solana/fetchSolanaLastBlockNumber';

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const useLastBlockNumber = (url?: string): [number, boolean] => {
  const [fetchSolanaLastBlockNumber, { data = 0, isLoading }, reset] =
    useQueryEndpoint(chainsFetchSolanaLastBlockNumber, options);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (url) {
      const { unsubscribe } = fetchSolanaLastBlockNumber(url);

      return unsubscribe;
    }

    return () => {};
  }, [fetchSolanaLastBlockNumber, url]);

  return [data, isLoading];
};

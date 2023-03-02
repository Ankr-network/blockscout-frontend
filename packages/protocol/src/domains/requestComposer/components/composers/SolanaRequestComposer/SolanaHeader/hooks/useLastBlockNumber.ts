import { useEffect } from 'react';

import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchSolanaLastBlockNumber } from 'domains/requestComposer/actions/solana/fetchSolanaLastBlockNumber';

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export interface LastBlockNumberParams {
  publicUrl?: string;
  hasBlockNumber?: boolean;
}

export const useLastBlockNumber = ({
  hasBlockNumber,
  publicUrl,
}: LastBlockNumberParams): [number, boolean] => {
  const [fetchSolanaLastBlockNumber, { data = 0, isLoading }, reset] =
    useQueryEndpoint(chainsFetchSolanaLastBlockNumber, options);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (publicUrl && hasBlockNumber) {
      const { unsubscribe } = fetchSolanaLastBlockNumber(publicUrl);

      return unsubscribe;
    }

    return () => {};
  }, [fetchSolanaLastBlockNumber, hasBlockNumber, publicUrl]);

  return [data, isLoading];
};

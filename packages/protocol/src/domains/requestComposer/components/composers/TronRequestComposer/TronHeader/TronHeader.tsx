import { useEffect } from 'react';

import { BlockNumber } from '../../../Header/BlockNumber';
import { ChainID } from 'modules/chains/types';
import { Header } from '../../../Header';
import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchTronLastBlockNumber } from 'domains/requestComposer/actions/tron/fetchTronLastBlockNumber';

export interface HeaderProps {
  publicUrl?: string;
}

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const TronHeader = ({ publicUrl }: HeaderProps) => {
  const [fetchTronLastBlockNumber, { data = 0, isLoading }, reset] =
    useQueryEndpoint(chainsFetchTronLastBlockNumber, options);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (publicUrl) {
      const { unsubscribe } = fetchTronLastBlockNumber(publicUrl);

      return unsubscribe;
    }

    return () => {};
  }, [fetchTronLastBlockNumber, publicUrl]);

  return (
    <Header chainName={ChainID.TRON}>
      <BlockNumber<number> data={data} loading={isLoading} />
    </Header>
  );
};

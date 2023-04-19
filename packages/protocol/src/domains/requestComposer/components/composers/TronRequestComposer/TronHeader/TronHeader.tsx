import { useEffect } from 'react';

import { BlockNumber } from '../../../Header/BlockNumber';
import { ChainID } from 'modules/chains/types';
import { Header } from '../../../Header';
import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchTronLastBlockNumber } from 'domains/requestComposer/actions/tron/fetchTronLastBlockNumber';

export interface HeaderProps {
  hasBlockNumber?: boolean;
  hasTitle?: boolean;
  publicUrl?: string;
}

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const TronHeader = ({
  hasBlockNumber,
  hasTitle,
  publicUrl,
}: HeaderProps) => {
  const [fetchTronLastBlockNumber, { data = 0, isLoading }, reset] =
    useQueryEndpoint(chainsFetchTronLastBlockNumber, options);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (publicUrl && hasBlockNumber) {
      const { unsubscribe } = fetchTronLastBlockNumber(publicUrl);

      return unsubscribe;
    }

    return () => {};
  }, [fetchTronLastBlockNumber, hasBlockNumber, publicUrl]);

  return (
    <Header chainName={ChainID.TRON} hasTitle={hasTitle}>
      {hasBlockNumber && (
        <BlockNumber<number> data={data} loading={isLoading} />
      )}
    </Header>
  );
};
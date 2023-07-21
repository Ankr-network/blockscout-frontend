import { useEffect } from 'react';

import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchLastBlockNumber } from 'domains/requestComposer/actions/fetchLastBlockNumber';

import { BlockNumber } from '../../../Header/BlockNumber';
import { Header } from '../../../Header';

export interface HeaderProps {
  chainId?: string;
  hasBlockNumber?: boolean;
  hasTitle?: boolean;
  publicUrl?: string;
}

const options: Options = {
  subscriptionOptions: { pollingInterval: 30_000 },
};

export const EVMHeader = ({
  chainId,
  hasBlockNumber,
  hasTitle,
  publicUrl,
}: HeaderProps) => {
  const [fetchLastBlockNumber, { data, isLoading }, reset] = useQueryEndpoint(
    chainsFetchLastBlockNumber,
    options,
  );

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (publicUrl && hasBlockNumber) {
      const { unsubscribe } = fetchLastBlockNumber(publicUrl);

      return unsubscribe;
    }

    return () => {};
  }, [fetchLastBlockNumber, hasBlockNumber, publicUrl]);

  return (
    <Header hasTitle={hasTitle}>
      {hasBlockNumber && (
        <BlockNumber data={data} loading={isLoading} chainId={chainId} />
      )}
    </Header>
  );
};

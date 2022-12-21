import { useEffect } from 'react';

import { BlockNumber } from '../../../Header/BlockNumber';
import { Header } from '../../../Header';
import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchLastBlockNumber } from 'domains/requestComposer/actions/fetchLastBlockNumber';

export interface HeaderProps {
  publicUrl?: string;
}

const options: Options = {
  subscriptionOptions: { pollingInterval: 30_000 },
};

export const EVMHeader = ({ publicUrl }: HeaderProps) => {
  const [fetchLastBlockNumber, { data, isLoading }, reset] = useQueryEndpoint(
    chainsFetchLastBlockNumber,
    options,
  );

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (publicUrl) {
      const { unsubscribe } = fetchLastBlockNumber(publicUrl);

      return unsubscribe;
    }

    return () => {};
  }, [fetchLastBlockNumber, publicUrl]);

  return (
    <Header>
      <BlockNumber data={data} loading={isLoading} />
    </Header>
  );
};

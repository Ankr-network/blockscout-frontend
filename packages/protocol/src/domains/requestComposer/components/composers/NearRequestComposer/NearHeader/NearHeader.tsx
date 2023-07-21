import { useEffect } from 'react';

import { ChainGroupID } from 'modules/endpoints/types';
import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchNearLastBlockNumber } from 'domains/requestComposer/actions/near/fetchNearLastBlockNumber';

import { Header } from '../../../Header';
import { BlockNumber } from '../../../Header/BlockNumber';

export interface IHeaderProps {
  hasBlockNumber?: boolean;
  hasTitle?: boolean;
  publicUrl?: string;
}

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const NearHeader = ({
  hasBlockNumber,
  hasTitle,
  publicUrl,
}: IHeaderProps) => {
  const [fetchNearLastBlockNumber, { data = 0, isLoading }, reset] =
    useQueryEndpoint(chainsFetchNearLastBlockNumber, options);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (publicUrl && hasBlockNumber) {
      const { unsubscribe } = fetchNearLastBlockNumber(publicUrl);

      return unsubscribe;
    }

    return () => {};
  }, [fetchNearLastBlockNumber, hasBlockNumber, publicUrl]);

  return (
    <Header chainName={ChainGroupID.NEAR} hasTitle={hasTitle}>
      {hasBlockNumber && (
        <BlockNumber<number> data={data} loading={isLoading} />
      )}
    </Header>
  );
};

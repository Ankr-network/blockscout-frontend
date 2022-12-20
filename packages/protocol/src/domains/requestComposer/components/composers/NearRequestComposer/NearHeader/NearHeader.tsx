import { useEffect } from 'react';

import { BlockNumber } from '../../../Header/BlockNumber';
import { ChainGroupID } from 'modules/endpoints/types';
import { Header } from '../../../Header';
import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchNearLastBlockNumber } from 'domains/requestComposer/actions/near/fetchNearLastBlockNumber';

export interface IHeaderProps {
  publicUrl?: string;
}

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const NearHeader = ({ publicUrl }: IHeaderProps) => {
  const [fetchNearLastBlockNumber, { data = 0, isLoading }] = useQueryEndpoint(
    chainsFetchNearLastBlockNumber,
    options,
  );

  useEffect(() => {
    if (publicUrl) {
      const { unsubscribe } = fetchNearLastBlockNumber(publicUrl);

      return unsubscribe;
    }

    return () => {};
  }, [fetchNearLastBlockNumber, publicUrl]);

  return (
    <Header chainName={ChainGroupID.NEAR}>
      <BlockNumber<number> data={data} loading={isLoading} />
    </Header>
  );
};

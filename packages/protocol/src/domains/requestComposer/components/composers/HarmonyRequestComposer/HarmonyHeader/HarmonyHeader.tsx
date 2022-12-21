import { useEffect } from 'react';

import { BlockNumber } from '../../../Header/BlockNumber';
import { Header } from '../../../Header';
import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchLastBlockNumber } from 'domains/requestComposer/actions/fetchLastBlockNumber';

export interface HarmonyHeaderProps {
  chainName?: string;
  publicUrl?: string;
}

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const HarmonyHeader = ({ publicUrl, chainName }: HarmonyHeaderProps) => {
  const [fetchLastBlockNumber, { data = 0, isLoading }, reset] =
    useQueryEndpoint(chainsFetchLastBlockNumber, options);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (publicUrl) {
      const { unsubscribe } = fetchLastBlockNumber(publicUrl);

      return unsubscribe;
    }

    return () => {};
  }, [fetchLastBlockNumber, publicUrl]);

  return (
    <Header chainName={chainName}>
      <BlockNumber<number> data={data} loading={isLoading} />
    </Header>
  );
};

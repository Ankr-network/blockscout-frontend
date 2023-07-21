import { useEffect } from 'react';

import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchLastBlockNumber } from 'domains/requestComposer/actions/fetchLastBlockNumber';

import { BlockNumber } from '../../../Header/BlockNumber';
import { Header } from '../../../Header';

export interface HarmonyHeaderProps {
  chainName?: string;
  hasBlockNumber?: boolean;
  hasTitle?: boolean;
  publicUrl?: string;
}

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 30_000,
  },
};

export const HarmonyHeader = ({
  chainName,
  hasBlockNumber,
  hasTitle,
  publicUrl,
}: HarmonyHeaderProps) => {
  const [fetchLastBlockNumber, { data = 0, isLoading }, reset] =
    useQueryEndpoint(chainsFetchLastBlockNumber, options);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    if (publicUrl && hasBlockNumber) {
      const { unsubscribe } = fetchLastBlockNumber(publicUrl);

      return unsubscribe;
    }

    return () => {};
  }, [fetchLastBlockNumber, hasBlockNumber, publicUrl]);

  return (
    <Header chainName={chainName} hasTitle={hasTitle}>
      {hasBlockNumber && (
        <BlockNumber<number> data={data} loading={isLoading} />
      )}
    </Header>
  );
};

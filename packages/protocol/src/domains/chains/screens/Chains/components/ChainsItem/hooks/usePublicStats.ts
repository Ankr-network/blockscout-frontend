import { Timeframe as DetailsTimeframe } from 'multirpc-sdk';
import { useEffect } from 'react';

import { Timeframe } from 'domains/chains/types';
import { useLazyChainsFetchChainDetailsQuery } from 'domains/chains/actions/fetchChainDetails';

export interface PublicStatsParams {
  chainId: string;
  isWalletConnected: boolean;
  timeframe: Timeframe;
}

const timeframesMap: Record<Timeframe, DetailsTimeframe> = {
  [Timeframe.Hour]: '1h',
  [Timeframe.Day]: '24h',
  [Timeframe.Week]: '7d',
  [Timeframe.Month]: '30d',
};

export const usePublicStats = ({
  chainId,
  isWalletConnected,
  timeframe,
}: PublicStatsParams): boolean => {
  const [fetchChainDetails, { isLoading }] =
    useLazyChainsFetchChainDetailsQuery();

  useEffect(() => {
    if (!isWalletConnected) {
      fetchChainDetails({ chainId, timeframe: timeframesMap[timeframe] });
    }
  }, [fetchChainDetails, isWalletConnected, chainId, timeframe]);

  return isLoading;
};

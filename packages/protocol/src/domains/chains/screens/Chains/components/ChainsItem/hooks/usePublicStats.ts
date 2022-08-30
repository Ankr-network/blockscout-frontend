import { Timeframe as DetailsTimeframe } from 'multirpc-sdk';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useEffect } from 'react';

import { Timeframe } from 'domains/chains/types';
import { fetchChainDetails } from 'domains/chains/actions/fetchChainDetails';

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
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    if (!isWalletConnected) {
      dispatchRequest(fetchChainDetails(chainId, timeframesMap[timeframe]));
    }
  }, [isWalletConnected, dispatchRequest, chainId, timeframe]);

  const { loading } = useMutation({
    type: fetchChainDetails,
    requestKey: chainId,
  });

  return loading;
};

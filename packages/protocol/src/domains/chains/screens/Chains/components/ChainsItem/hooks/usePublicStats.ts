import { Timeframe } from 'multirpc-sdk';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useEffect } from 'react';

import { fetchChainDetails } from 'domains/chains/actions/fetchChainDetails';
import { StatsTimeframe } from 'domains/chains/types';

export interface PublicStatsParams {
  chainId: string;
  isWalletConnected: boolean;
  statsTimeframe: StatsTimeframe;
}

const timeframesMap: Record<StatsTimeframe, Timeframe> = {
  [StatsTimeframe.DAY]: '24h',
  [StatsTimeframe.WEEK]: '7d',
  [StatsTimeframe.MONTH]: '30d',
};

export const usePublicStats = ({
  chainId,
  isWalletConnected,
  statsTimeframe,
}: PublicStatsParams): boolean => {
  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    if (!isWalletConnected) {
      dispatchRequest(
        fetchChainDetails(chainId, timeframesMap[statsTimeframe]),
      );
    }
  }, [isWalletConnected, dispatchRequest, chainId, statsTimeframe]);

  const { loading } = useMutation({
    type: fetchChainDetails,
    requestKey: chainId,
  });

  return loading;
};

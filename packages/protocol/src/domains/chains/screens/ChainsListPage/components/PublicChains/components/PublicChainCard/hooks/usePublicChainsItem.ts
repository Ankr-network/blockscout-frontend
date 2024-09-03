import BigNumber from 'bignumber.js';

import { Chain, Timeframe } from 'modules/chains/types';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useChainsFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';

export interface ChainsItemParams {
  chain: Chain;
  isMMIndex?: boolean;
  timeframe: Timeframe;
}

export const usePublicChainsItem = ({
  chain: { id },
  timeframe,
}: ChainsItemParams) => {
  const { data, isLoading: arePublicStatsLoading } =
    useChainsFetchPublicRequestsCountStatsQuery(toTimeframeMap[timeframe]);

  return {
    totalRequests: new BigNumber(data?.[id] ?? 0),
    loading: arePublicStatsLoading,
  };
};

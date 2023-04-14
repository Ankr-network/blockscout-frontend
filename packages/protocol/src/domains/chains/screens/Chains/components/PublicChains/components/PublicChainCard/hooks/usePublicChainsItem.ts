import BigNumber from 'bignumber.js';

import { useChainsFetchPublicRequestsCountStatsQuery } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import { toTimeframeMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { Chain, Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';

export interface ChainsItemParams {
  chain: Chain;
  isMMIndex?: boolean;
  timeframe: Timeframe;
}

export const usePublicChainsItem = ({
  chain: { id, frontChain: { id: frontChainId } = {} },
  timeframe,
}: ChainsItemParams) => {
  const { data, isLoading: arePublicStatsLoading } =
    useChainsFetchPublicRequestsCountStatsQuery(toTimeframeMap[timeframe]);

  const chainId = id === ChainID.ZETACHAIN ? id : frontChainId || id;

  return {
    totalRequests: new BigNumber(data?.[chainId] ?? 0),
    loading: arePublicStatsLoading,
  };
};

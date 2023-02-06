import BigNumber from 'bignumber.js';

import { chainsFetchPublicRequestsCountStats } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import { Chain } from 'domains/chains/types';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface ChainsItemParams {
  chain: Chain;
  isMMIndex?: boolean;
}

export const usePublicChainsItem = ({
  chain: { id, frontChain: { id: frontChainId } = {} },
}: ChainsItemParams) => {
  const [, { data, isLoading: arePublicStatsLoading }] = useQueryEndpoint(
    chainsFetchPublicRequestsCountStats,
  );

  const chainId = frontChainId || id;

  return {
    totalRequests: new BigNumber(data?.[chainId] ?? 0),
    loading: arePublicStatsLoading,
  };
};

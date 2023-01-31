import { useMemo } from 'react';

import { IApiChain } from 'domains/chains/api/queryChains';
import { SortType } from 'domains/chains/types';
import { chainsFetchPublicRequestsCountStats } from 'domains/chains/actions/public/fetchPublicRequestsCountStats';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { sortPublicChains, formatRequestsCount } from './utils';
import { getChainsDictionary } from 'domains/chains/components/ChainsList/ChainsListUtils';

export interface ChainsParams {
  chains: IApiChain[];
  allChains: IApiChain[];
  sortType: SortType;
}

export const usePublicChains = ({
  chains,
  allChains,
  sortType,
}: ChainsParams) => {
  const [, { isLoading: arePublicStatsLoading }] = useQueryEndpoint(
    chainsFetchPublicRequestsCountStats,
  );

  const [, { data }] = useQueryEndpoint(chainsFetchPublicRequestsCountStats);

  const processedChains = useMemo(
    () =>
      sortPublicChains({
        chains: formatRequestsCount(chains, data),
        sortType,
        isLoading: arePublicStatsLoading,
      }),
    [chains, data, sortType, arePublicStatsLoading],
  );

  const chainsDictionary = useMemo(
    () => getChainsDictionary(allChains),
    [allChains],
  );

  return { processedChains, chainsDictionary };
};

import { SortPrivateChainsParams } from '../PrivateChainsTypes';
import {
  extractCustomizedChains,
  getChainId,
} from 'domains/chains/components/ChainsList/ChainsListUtils';
import { Chain, SortType } from 'domains/chains/types';

export const sortPrivateChains = ({
  chains: rawChains = [],
  sortType,
  stats,
}: SortPrivateChainsParams): Chain[] => {
  if (!Array.isArray(rawChains)) return [];

  const [chains, customizedChains] = extractCustomizedChains(rawChains);

  const privateChainsUsageSorter = (a: Chain, b: Chain) =>
    (stats[getChainId(b)]?.total_requests || 0) -
    (stats[getChainId(a)]?.total_requests || 0);

  const sorter =
    sortType === SortType.Usage ? privateChainsUsageSorter : () => 0;

  const sortedChains = [...chains].sort(sorter);

  return [...customizedChains, ...sortedChains];
};

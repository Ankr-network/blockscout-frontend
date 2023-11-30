import { Chain, SortType } from 'modules/chains/types';
import { extractCustomizedChains } from 'domains/chains/components/ChainsList/ChainsListUtils';

import { SortPrivateChainsParams } from '../PrivateChainsTypes';
import { aggregateTotalRequestsNumber } from '../utils/aggregateTotalRequestsNumber';
import { chainsUsageSorter } from '../../PublicChains/hooks/utils';
import { getChainIDs } from '../utils/getChainIDs';

export const sortPrivateChains = ({
  chains: rawChains = [],
  sortType,
  stats,
}: SortPrivateChainsParams): Chain[] => {
  if (!Array.isArray(rawChains)) return [];

  const [chains, customizedChains] = extractCustomizedChains(rawChains);

  const privateChainsUsageSorter = (a: Chain, b: Chain) =>
    aggregateTotalRequestsNumber({ ids: getChainIDs(b), stats }) -
    aggregateTotalRequestsNumber({ ids: getChainIDs(a), stats });

  const noStatsSorter =
    sortType === SortType.Usage ? chainsUsageSorter : () => 0;

  const sorter =
    sortType === SortType.Usage ? privateChainsUsageSorter : () => 0;

  const sortedChains = [...chains].sort(noStatsSorter).sort(sorter);

  return [...customizedChains, ...sortedChains];
};

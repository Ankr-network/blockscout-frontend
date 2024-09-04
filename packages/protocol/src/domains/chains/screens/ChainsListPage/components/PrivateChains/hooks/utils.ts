import { Chain, ESortChainsType } from 'modules/chains/types';

import { SortPrivateChainsParams } from '../PrivateChainsTypes';
import { aggregateTotalRequestsNumber } from '../utils/aggregateTotalRequestsNumber';
import { getChainIDs } from '../utils/getChainIDs';

export const sortPrivateChains = ({
  chains: rawChains = [],
  sortType,
  stats,
}: SortPrivateChainsParams): Chain[] => {
  if (!Array.isArray(rawChains)) return [];

  const privateChainsUsageSorter = (a: Chain, b: Chain) =>
    aggregateTotalRequestsNumber({ ids: getChainIDs(b), stats }) -
    aggregateTotalRequestsNumber({ ids: getChainIDs(a), stats });

  const sorter =
    sortType === ESortChainsType.UsageHighLow
      ? privateChainsUsageSorter
      : () => 0;

  const sortedChains = [...rawChains].sort(sorter);

  return [...sortedChains];
};

import BigNumber from 'bignumber.js';
import { PrivateStatsInternal } from 'multirpc-sdk';

import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { SortType, StatsTimeframe } from 'domains/chains/types';

export interface ChainsListProps {
  chains: IApiChain[];
  sortType: SortType;
  statsTimeframe: StatsTimeframe;
}

export interface Chain {
  id: string;
  icon: string;
  extenders?: IApiChain[];
  extensions?: IApiChain[];
  name: string;
  totalRequests?: BigNumber;
  isArchive?: boolean;
  urls: IApiChainURL[];
}

export interface SortChainsParams {
  chains: Chain[];
  isWalletConnected: boolean;
  sortType: SortType;
  stats: PrivateStatsInternal;
}

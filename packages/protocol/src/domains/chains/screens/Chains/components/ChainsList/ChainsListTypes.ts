import BigNumber from 'bignumber.js';
import { PrivateStatsInternal } from 'multirpc-sdk';

import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { SortType, Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';

export interface ChainsListProps {
  isMMIndex?: boolean;
  chains: IApiChain[];
  allChains: IApiChain[];
  sortType: SortType;
  timeframe: Timeframe;
}

export interface Chain {
  extenders?: IApiChain[];
  extensions?: IApiChain[];
  frontChain?: IApiChain['frontChain'];
  icon: string;
  id: ChainID;
  isArchive?: boolean;
  name: string;
  totalRequests?: BigNumber;
  type: IApiChain['type'];
  urls: IApiChainURL[];
}

export interface SortChainsParams {
  chains: Chain[];
  hasCredentials: boolean;
  sortType: SortType;
  stats: PrivateStatsInternal;
}

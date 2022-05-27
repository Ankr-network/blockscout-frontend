import BigNumber from 'bignumber.js';
import { IApiChain, IApiChainURL } from 'domains/chains/api/queryChains';
import { SortType } from '../ChainsSortSelect/ChainsSortSelectUtils';

export interface ChainsListProps {
  data: IApiChain[];
  sortType: SortType;
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

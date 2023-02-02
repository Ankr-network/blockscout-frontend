import { Chain, SortType, Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';

export interface ChainsListProps {
  isMMIndex?: boolean;
  timeframe: Timeframe;
  chains: Chain[];
  chainsDictionary: Partial<Record<ChainID, Chain>>;
}

export interface SortChainsParams {
  chains: Chain[];
  sortType: SortType;
}

export type ChainMap = Partial<Record<ChainID, Chain>>;

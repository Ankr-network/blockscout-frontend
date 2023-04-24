import { Chain, SortType } from 'domains/chains/types';
import { ChainID } from 'domains/chains/types';

export interface SortChainsParams {
  chains: Chain[];
  sortType: SortType;
}

export type ChainMap = Partial<Record<ChainID, Chain>>;

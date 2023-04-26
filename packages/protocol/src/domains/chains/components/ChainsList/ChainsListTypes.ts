import { Chain, ChainID, SortType } from 'domains/chains/types';

export interface SortChainsParams {
  chains: Chain[];
  sortType: SortType;
}

export type ChainMap = Partial<Record<ChainID, Chain>>;

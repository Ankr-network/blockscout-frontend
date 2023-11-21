import { Chain, ChainID, SortType } from 'modules/chains/types';

export interface SortChainsParams {
  chains: Chain[];
  sortType: SortType;
}

export type ChainMap = Partial<Record<ChainID, Chain>>;

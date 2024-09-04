import { Chain, ChainID, ESortChainsType } from 'modules/chains/types';

export interface SortChainsParams {
  chains: Chain[];
  sortType: ESortChainsType;
}

export type ChainMap = Partial<Record<ChainID, Chain>>;

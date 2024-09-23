import { Chain, ChainID, ESortChainsType } from '@ankr.com/chains-list';

export interface SortChainsParams {
  chains: Chain[];
  sortType: ESortChainsType;
}

export type ChainMap = Partial<Record<ChainID, Chain>>;

import { Chain, SortType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';

export interface SortChainsParams {
  chains: Chain[];
  sortType: SortType;
}

export type ChainMap = Partial<Record<ChainID, Chain>>;

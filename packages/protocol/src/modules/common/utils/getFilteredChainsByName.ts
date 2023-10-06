import { Chain } from 'domains/chains/types';

export const getFilteredChainsByName = (chains: Chain, searchContent: string) =>
  chains.name.toLocaleLowerCase().includes(searchContent.toLowerCase());

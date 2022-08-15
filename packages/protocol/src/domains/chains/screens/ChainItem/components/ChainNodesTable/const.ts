import { IApiChain } from 'domains/chains/api/queryChains';

type ChainIDLinkMap = Partial<Record<IApiChain['id'], IApiChain['id']>>;

// TODO: use ChainID enum
export const CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  'avalanche-evm': 'avalanche',
  'avalanche-c': 'avalanche',
  'avalanche-p': 'avalanche',
  'avalanche-x': 'avalanche',

  'avalanche_fuji-evm': 'avalanche_fuji',
  'avalanche_fuji-c': 'avalanche_fuji',
  'avalanche_fuji-p': 'avalanche_fuji',
  'avalanche_fuji-x': 'avalanche_fuji',
};

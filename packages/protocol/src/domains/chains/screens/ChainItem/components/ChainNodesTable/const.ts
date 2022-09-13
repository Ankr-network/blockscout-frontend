import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainID } from 'modules/chains/types';

type ChainIDLinkMap = Partial<Record<IApiChain['id'], IApiChain['id']>>;

export const CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  'avalanche-evm': ChainID.AVALANCHE,
  'avalanche-c': ChainID.AVALANCHE,
  'avalanche-p': ChainID.AVALANCHE,
  'avalanche-x': ChainID.AVALANCHE,

  'avalanche_fuji-evm': ChainID.AVALANCHE_FUJI,
  'avalanche_fuji-c': ChainID.AVALANCHE_FUJI,
  'avalanche_fuji-p': ChainID.AVALANCHE_FUJI,
  'avalanche_fuji-x': ChainID.AVALANCHE_FUJI,
};

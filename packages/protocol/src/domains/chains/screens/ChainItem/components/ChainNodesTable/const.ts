import { ChainID } from 'modules/chains/types';

type ChainIDLinkMap = Partial<Record<ChainID, ChainID>>;

export const CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  'avalanche-evm': ChainID.AVALANCHE,
  'avalanche-c': ChainID.AVALANCHE,
  'avalanche-p': ChainID.AVALANCHE,
  'avalanche-x': ChainID.AVALANCHE,

  'avalanche_fuji-evm': ChainID.AVALANCHE_FUJI,
  'avalanche_fuji-c': ChainID.AVALANCHE_FUJI,
  'avalanche_fuji-p': ChainID.AVALANCHE_FUJI,
  'avalanche_fuji-x': ChainID.AVALANCHE_FUJI,

  'scrt-rpc': ChainID.SECRET,
  'scrt-rest': ChainID.SECRET,
  'scrt-cosmos-rest': ChainID.SECRET_COSMOS,
};

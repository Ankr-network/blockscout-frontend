import { ChainID } from 'modules/chains/types';

type ChainIDLinkMap = Partial<Record<ChainID, ChainID>>;
const WHITELIST_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  'scrt-rpc': ChainID.SECRET,
};

export const checkWhitelistSecretChainsAndGetChainId = (chainId: ChainID) =>
  WHITELIST_CHAIN_ID_LINK_MAP[chainId] || chainId;

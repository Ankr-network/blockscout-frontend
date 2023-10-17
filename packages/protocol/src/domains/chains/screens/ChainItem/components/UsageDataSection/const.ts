import { ChainID } from 'domains/chains/types';

export const POLL_INTERVAL = 60_000;

type ChainIDLinkMap = Partial<Record<ChainID, ChainID>>;

const PUBLIC_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  [ChainID.SECRET_REST]: ChainID.SECRET,
  [ChainID.SECRET_RPC]: ChainID.SECRET,
  [ChainID.SECRET_COSMOS]: ChainID.SECRET,
  [ChainID.SECRET_COSMOS_GRPC_WEB]: ChainID.SECRET,
  [ChainID.SECRET_COSMOS_REST]: ChainID.SECRET,

  [ChainID.SEI_COSMOS_GRPS_WEB]: ChainID.SEI,
  [ChainID.SEI_COSMOS_REST]: ChainID.SEI,
  [ChainID.SEI_REST]: ChainID.SEI,
  [ChainID.SEI_RPC]: ChainID.SEI,

  [ChainID.ZETACHAIN_COSMOS_REST_ATHENS_TESTNET]:
    ChainID.ZETACHAIN_ATHENS_TESTNET,
  [ChainID.ZETACHAIN_EVM_ATHENS_TESTNET]: ChainID.ZETACHAIN_ATHENS_TESTNET,
  [ChainID.ZETACHAIN_TENDERMINT_REST_ATHENS_TESTNET]:
    ChainID.ZETACHAIN_ATHENS_TESTNET,
  [ChainID.ZETACHAIN_TENDERMINT_RPC_ATHENS_TESTNET]:
    ChainID.ZETACHAIN_ATHENS_TESTNET,
  [ChainID.ZETACHAIN_ATHENS_TESTNET]: ChainID.ZETACHAIN_ATHENS_TESTNET,

  [ChainID.HORIZEN_TESTNET_EVM]: ChainID.HORIZEN_TESTNET,
  [ChainID.HORIZEN_EVM]: ChainID.HORIZEN,

  [ChainID.TENET_EVM]: ChainID.TENET,
  [ChainID.BERACHAIN_GUARDED_TESTNET_EVM]: ChainID.BERACHAIN_GUARDED_TESTNET,
};

export const checkPublicChainsAndGetChainId = (chainId: ChainID) =>
  PUBLIC_CHAIN_ID_LINK_MAP[chainId] || chainId;

// chain ids for private stats differ from regular chain ids
const PRIVATE_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  [ChainID.SECRET_REST]: ChainID.SECRET,
  [ChainID.SECRET_RPC]: ChainID.SECRET,
  [ChainID.SECRET_COSMOS_GRPC_WEB]: ChainID.SECRET_COSMOS,
  [ChainID.SECRET_COSMOS_REST]: ChainID.SECRET_COSMOS,

  [ChainID.ZETACHAIN_COSMOS_REST_ATHENS_TESTNET]:
    'zetachain_athens_testnet' as ChainID,
  [ChainID.ZETACHAIN_EVM_ATHENS_TESTNET]:
    'zetachain_evm_athens_testnet' as ChainID,
  [ChainID.ZETACHAIN_TENDERMINT_REST_ATHENS_TESTNET]:
    'zetachain_tendermint_athens_testnet' as ChainID,
  [ChainID.ZETACHAIN_TENDERMINT_RPC_ATHENS_TESTNET]:
    'zetachain_tendermint_athens_testnet' as ChainID,
  [ChainID.ZETACHAIN_ATHENS_TESTNET]: 'zetachain_athens_testnet' as ChainID,

  [ChainID.TENET_EVM]: 'tenet_evm' as ChainID,

  [ChainID.HORIZEN_EVM]: 'horizen_eon' as ChainID,
  [ChainID.HORIZEN_TESTNET_EVM]: 'horizen_gobi_testnet' as ChainID,

  [ChainID.BERACHAIN_GUARDED_TESTNET_EVM]:
    'berachain_guarded_testnet_evm' as ChainID,

  [ChainID.SEI_COSMOS_GRPS_WEB]: 'sei_grpc' as ChainID,
  [ChainID.SEI_COSMOS_REST]: 'sei_cosmos' as ChainID,
  [ChainID.SEI_REST]: ChainID.SEI,
  [ChainID.SEI_RPC]: ChainID.SEI,
};

export const checkPrivateChainsAndGetChainId = (
  chainId: ChainID,
  ignoredIds?: ChainID[],
) => {
  if (ignoredIds?.includes(chainId)) {
    return chainId;
  }

  return PRIVATE_CHAIN_ID_LINK_MAP[chainId] || chainId;
};

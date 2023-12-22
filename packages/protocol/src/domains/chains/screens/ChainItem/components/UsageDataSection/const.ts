import { ChainID } from 'modules/chains/types';

export const POLL_INTERVAL = 60_000;

type ChainIDLinkMap = Partial<Record<ChainID, ChainID>>;

const PUBLIC_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  [ChainID.SECRET_REST]: ChainID.SECRET,
  [ChainID.SECRET_RPC]: ChainID.SECRET,
  [ChainID.SECRET_COSMOS]: ChainID.SECRET,
  [ChainID.SECRET_COSMOS_GRPC_WEB]: ChainID.SECRET,
  [ChainID.SECRET_COSMOS_REST]: ChainID.SECRET,

  [ChainID.SEI_COSMOS_GRPC_WEB]: ChainID.SEI,
  [ChainID.SEI_COSMOS_REST]: ChainID.SEI,
  [ChainID.SEI_REST]: ChainID.SEI,
  [ChainID.SEI_RPC]: ChainID.SEI,
  [ChainID.SEI_TESTNET]: ChainID.SEI_TESTNET,
  [ChainID.SEI_RPC_TESTNET]: ChainID.SEI_TESTNET,
  [ChainID.SEI_REST_TESTNET]: ChainID.SEI_TESTNET,
  [ChainID.SEI_COSMOS_REST_TESTNET]: ChainID.SEI_TESTNET,
  [ChainID.SEI_COSMOS_GRPC_TESTNET]: ChainID.SEI_TESTNET,

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

  [ChainID.KAVA_COSMOS_REST]: ChainID.KAVA,
  [ChainID.KAVA_EVM]: ChainID.KAVA,
  [ChainID.KAVA_TENDERMINT_REST]: ChainID.KAVA,
  [ChainID.KAVA_TENDERMINT_RPC]: ChainID.KAVA,
  [ChainID.KAVA_COSMOS_REST_TESTNET]: ChainID.KAVA_TESTNET,
  [ChainID.KAVA_EVM_TESTNET]: ChainID.KAVA_TESTNET,
  [ChainID.KAVA_TENDERMINT_REST_TESTNET]: ChainID.KAVA_TESTNET,
  [ChainID.KAVA_TENDERMINT_RPC_TESTNET]: ChainID.KAVA_TESTNET,
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

  [ChainID.SEI_COSMOS_GRPC_WEB]: 'sei_grpc' as ChainID,
  [ChainID.SEI_COSMOS_REST]: 'sei_cosmos' as ChainID,
  [ChainID.SEI_REST]: ChainID.SEI,
  [ChainID.SEI_RPC]: ChainID.SEI,
  [ChainID.SEI_TESTNET]: 'sei_testnet' as ChainID,
  [ChainID.SEI_RPC_TESTNET]: 'sei_testnet' as ChainID,
  [ChainID.SEI_REST_TESTNET]: 'sei_testnet' as ChainID,
  [ChainID.SEI_COSMOS_REST_TESTNET]: 'sei_cosmos_testnet' as ChainID,
  [ChainID.SEI_COSMOS_GRPC_TESTNET]: 'sei_grpc_testnet' as ChainID,

  // [ChainID.KAVA]: '' as ChainID,
  // [ChainID.KAVA_COSMOS_REST]: '' as ChainID,
  // [ChainID.KAVA_EVM]: '' as ChainID,
  // [ChainID.KAVA_TENDERMINT_REST]: '' as ChainID,
  // [ChainID.KAVA_TENDERMINT_RPC]: '' as ChainID,
  // [ChainID.KAVA_COSMOS_REST_TESTNET]: '' as ChainID,
  // [ChainID.KAVA_EVM_TESTNET]: '' as ChainID,
  // [ChainID.KAVA_TENDERMINT_REST_TESTNET]: '' as ChainID,
  // [ChainID.KAVA_TENDERMINT_RPC_TESTNET]: '' as ChainID,
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

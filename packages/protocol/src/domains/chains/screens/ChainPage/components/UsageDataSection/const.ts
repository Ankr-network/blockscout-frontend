import { ChainID } from '@ankr.com/chains-list';

type ChainIDLinkMap = Partial<Record<ChainID, ChainID>>;

const PUBLIC_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  [ChainID.ALLORA_TESTNET_REST]: ChainID.ALLORA_TESTNET,
  [ChainID.ALLORA_TESTNET_RPC]: ChainID.ALLORA_TESTNET,
  [ChainID.ALLORA_TESTNET_COSMOS_REST]: ChainID.ALLORA_TESTNET,

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

  [ChainID.KAVA]: ChainID.KAVA,
  [ChainID.KAVA_COSMOS_REST]: ChainID.KAVA,
  [ChainID.KAVA_EVM]: ChainID.KAVA,
  [ChainID.KAVA_TENDERMINT_REST]: ChainID.KAVA,
  [ChainID.KAVA_TENDERMINT_RPC]: ChainID.KAVA,
  [ChainID.KAVA_COSMOS_REST_TESTNET]: ChainID.KAVA_TESTNET,
  [ChainID.KAVA_EVM_TESTNET]: ChainID.KAVA_TESTNET,
  [ChainID.KAVA_TENDERMINT_REST_TESTNET]: ChainID.KAVA_TESTNET,
  [ChainID.KAVA_TENDERMINT_RPC_TESTNET]: ChainID.KAVA_TESTNET,

  [ChainID.STELLAR_HORIZON]: ChainID.STELLAR,
  [ChainID.STELLAR_SOROBAN]: ChainID.STELLAR,
  [ChainID.STELLAR_TESTNET_HORIZON]: ChainID.STELLAR_TESTNET,
  [ChainID.STELLAR_TESTNET_SOROBAN]: ChainID.STELLAR_TESTNET,

  [ChainID.FLARE_COSTON_EVM]: ChainID.FLARE_COSTON,
  [ChainID.FLARE_COSTON_C]: ChainID.FLARE_COSTON,
  [ChainID.FLARE_COSTON_P]: ChainID.FLARE_COSTON,
  [ChainID.FLARE_COSTON_X]: ChainID.FLARE_COSTON,

  [ChainID.FLARE_COSTON2_EVM]: ChainID.FLARE_COSTON2,
  [ChainID.FLARE_COSTON2_C]: ChainID.FLARE_COSTON2,
  [ChainID.FLARE_COSTON2_P]: ChainID.FLARE_COSTON2,
  [ChainID.FLARE_COSTON2_X]: ChainID.FLARE_COSTON2,

  [ChainID.FLARE_SONGBIRD_EVM]: ChainID.FLARE_SONGBIRD,
  [ChainID.FLARE_SONGBIRD_C]: ChainID.FLARE_SONGBIRD,
  [ChainID.FLARE_SONGBIRD_P]: ChainID.FLARE_SONGBIRD,
  [ChainID.FLARE_SONGBIRD_X]: ChainID.FLARE_SONGBIRD,

  [ChainID.BTC_MAINNET]: ChainID.BTC,
  [ChainID.BTC_BLOCKBOOK]: ChainID.BTC,
};

export const checkPublicChainsAndGetChainId = (chainId: ChainID) =>
  PUBLIC_CHAIN_ID_LINK_MAP[chainId] || chainId;

// chain ids for private stats differ from regular chain ids
const PRIVATE_CHAIN_ID_LINK_MAP: ChainIDLinkMap = {
  [ChainID.ALLORA_TESTNET_REST]: ChainID.ALLORA_TESTNET,
  [ChainID.ALLORA_TESTNET_RPC]: ChainID.ALLORA_TESTNET,
  [ChainID.ALLORA_TESTNET_COSMOS_REST]: 'allora_cosmos_testnet' as ChainID,

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

  [ChainID.BERACHAIN_GUARDED_TESTNET_EVM]: 'berachain_testnet' as ChainID,

  [ChainID.SEI_COSMOS_GRPC_WEB]: 'sei_grpc' as ChainID,
  [ChainID.SEI_COSMOS_REST]: 'sei_cosmos' as ChainID,
  [ChainID.SEI_REST]: ChainID.SEI,
  [ChainID.SEI_RPC]: ChainID.SEI,
  [ChainID.SEI_TESTNET]: 'sei_testnet' as ChainID,
  [ChainID.SEI_RPC_TESTNET]: 'sei_testnet' as ChainID,
  [ChainID.SEI_REST_TESTNET]: 'sei_testnet' as ChainID,
  [ChainID.SEI_COSMOS_REST_TESTNET]: 'sei_cosmos_testnet' as ChainID,
  [ChainID.SEI_COSMOS_GRPC_TESTNET]: 'sei_grpc_testnet' as ChainID,

  [ChainID.KAVA]: 'kava_evm' as ChainID,
  [ChainID.KAVA_COSMOS_REST]: 'kava_api' as ChainID,
  [ChainID.KAVA_EVM]: 'kava_evm' as ChainID,
  [ChainID.KAVA_TENDERMINT_REST]: 'kava_rpc' as ChainID,
  [ChainID.KAVA_TENDERMINT_RPC]: 'kava_rpc' as ChainID,
  [ChainID.KAVA_COSMOS_REST_TESTNET]: 'kava_testnet_api' as ChainID,
  [ChainID.KAVA_EVM_TESTNET]: 'kava_testnet_evm' as ChainID,
  [ChainID.KAVA_TENDERMINT_REST_TESTNET]: 'kava_testnet_rpc' as ChainID,
  [ChainID.KAVA_TENDERMINT_RPC_TESTNET]: 'kava_testnet_rpc' as ChainID,

  [ChainID.STELLAR]: 'stellar_horizon' as ChainID,
  [ChainID.STELLAR_HORIZON]: 'stellar_horizon' as ChainID,
  [ChainID.STELLAR_SOROBAN]: 'stellar_soroban' as ChainID,
  [ChainID.STELLAR_TESTNET_HORIZON]: 'stellar_testnet_horizon' as ChainID,
  [ChainID.STELLAR_TESTNET_SOROBAN]: 'stellar_testnet_soroban' as ChainID,

  [ChainID.FLARE_COSTON_EVM]: ChainID.FLARE_COSTON,

  [ChainID.FLARE_COSTON2_EVM]: ChainID.FLARE_COSTON2,

  [ChainID.FLARE_SONGBIRD_EVM]: ChainID.FLARE_SONGBIRD,

  [ChainID.BTC_MAINNET]: ChainID.BTC,
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

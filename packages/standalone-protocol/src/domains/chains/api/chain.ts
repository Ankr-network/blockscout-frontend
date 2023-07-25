import { API_ENV } from 'modules/common/utils/environment';

export enum ChainId {
  Avalanche = 'avalanche',
  Arbitrum = 'arbitrum',
  BSC = 'bsc',
  Celo = 'celo',
  Chiliz = 'chiliz',
  Ethereum = 'eth',
  Fantom = 'fantom',
  HORIZEN_TESTNET_EVM = 'horizen_testnet_evm',
  Harmony = 'harmony',
  IoTeX = 'iotex',
  Mantle = 'mantle',
  Near = 'near',
  Nervos = 'nervos',
  Nervos_GW = 'nervos_gw',
  Polygon = 'polygon',
  Rollux = 'rollux',
  Solana = 'solana',
  Moonbeam = 'moonbeam',
  Gnosis = 'gnosis',
  Syscoin = 'syscoin',
  Secret = 'scrt',
  Tenet = 'tenet_evm',
  ZksyncEra = 'zksync_era',
  Filecoin = 'filecoin',
  Klaytn = 'klaytn',
  POLYGON_ZKEVM = 'zkevm',
}

export const HORIZEN_TESTNET_NAME = 'Horizen EON testnet';

export const POLYGON_ZKEVM_CHAIN_NAME = 'Polygon zkEVM';

export const POLYGON_NAME = 'Polygon PoS';

export const TENET_NAME = 'Tenet';

export const ZKSYNC_ERA_NAME = 'zkSync Era';

const STANDALONE_CHAINS = [ChainId.BSC, ChainId.Polygon, ChainId.Fantom];

export const isStandaloneChain = (chainId: ChainId) => {
  return STANDALONE_CHAINS.includes(chainId);
};

export type StandaloneType = ChainId.BSC | ChainId.Polygon | ChainId.Fantom;

const stagingUrls = {
  [ChainId.BSC]: 'https://staging.bscrpc.com/',
  [ChainId.Polygon]: 'https://staging.polygon-rpc.com/',
  [ChainId.Fantom]: 'https://staging.ftm.tools/',
  [ChainId.POLYGON_ZKEVM]: 'https://staging.polygon-rpc.com/',
};

export const getStandaloneUrl = (
  chainId: StandaloneType | ChainId.POLYGON_ZKEVM,
) => {
  if (API_ENV === 'prod') return '/';

  return stagingUrls[chainId];
};

type ChainIDLinkMap = Partial<Record<ChainId, ChainId>>;

export const MAP_CHAIN_ID_TO_NODE_DETAILS_ID: ChainIDLinkMap = {
  [ChainId.HORIZEN_TESTNET_EVM]: 'horizen-testnet-evm' as ChainId,
  [ChainId.Tenet]: 'tenet-evm' as ChainId,
};

export const MAP_CHAIN_ID_TO_DETAILS_ID: ChainIDLinkMap = {
  [ChainId.HORIZEN_TESTNET_EVM]: 'horizen' as ChainId,
  [ChainId.Tenet]: 'tenet' as ChainId,
};

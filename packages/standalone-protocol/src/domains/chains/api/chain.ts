import { API_ENV } from 'modules/common/utils/environment';

export enum ChainId {
  Avalanche = 'avalanche',
  Arbitrum = 'arbitrum',
  BSC = 'bsc',
  Celo = 'celo',
  Chiliz = 'chiliz',
  Core = 'core',
  Ethereum = 'eth',
  Fantom = 'fantom',
  Flare = 'flare',
  HORIZEN_EON = 'horizen_eon',
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
  Scroll = 'scroll',
  Syscoin = 'syscoin',
  Secret = 'scrt',
  Sei = 'sei',
  Tenet = 'tenet_evm',
  ZksyncEra = 'zksync_era',
  Filecoin = 'filecoin',
  Klaytn = 'klaytn',
  POLYGON_ZKEVM = 'zkevm',
  XDC = 'xdc',
  Kava = 'kava',
  Stellar = 'stellar',
  Kinto = 'kinto',
  B2 = 'b2',
}

export const HORIZEN_NAME = 'Horizen EON';

export const POLYGON_ZKEVM_CHAIN_NAME = 'Polygon zkEVM';

export const POLYGON_NAME = 'Polygon PoS';

export const TENET_NAME = 'Tenet';

export const ZKSYNC_ERA_NAME = 'zkSync Era';

export const XDC_NAME = 'XDC Network';

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
  [ChainId.HORIZEN_EON]: 'horizen-evm' as ChainId,
  [ChainId.Tenet]: 'tenet-evm' as ChainId,
  [ChainId.Kava]: 'kava-evm' as ChainId,
  [ChainId.Stellar]: 'stellar-horizon' as ChainId,
};

export const MAP_CHAIN_ID_TO_DETAILS_ID: ChainIDLinkMap = {
  [ChainId.HORIZEN_EON]: 'horizen' as ChainId,
  [ChainId.Tenet]: 'tenet' as ChainId,
};

import { API_ENV } from 'modules/common/utils/environment';

export enum ChainId {
  Avalanche = 'avalanche',
  Arbitrum = 'arbitrum',
  BSC = 'bsc',
  Celo = 'celo',
  Ethereum = 'eth',
  Fantom = 'fantom',
  Harmony = 'harmony',
  IoTeX = 'iotex',
  Near = 'near',
  Nervos = 'nervos',
  Nervos_GW = 'nervos_gw',
  Polygon = 'polygon',
  Solana = 'solana',
  Moonbeam = 'moonbeam',
  Gnosis = 'gnosis',
  Syscoin = 'syscoin',
  Secret = 'scrt',
  Filecoin = 'filecoin',
  Klaytn = 'klaytn',
}

export const CHAINS_WITHOUT_STATS = [
  ChainId.BSC,
  ChainId.Polygon,
  ChainId.Fantom,
];

export const isStandaloneChain = (chainId: ChainId) => {
  return CHAINS_WITHOUT_STATS.includes(chainId);
};

export type StandaloneType = ChainId.BSC | ChainId.Polygon | ChainId.Fantom;

const stagingUrls = {
  [ChainId.BSC]: 'https://staging.bscrpc.com/',
  [ChainId.Polygon]: 'https://staging.polygon-rpc.com/',
  [ChainId.Fantom]: 'https://staging.ftm.tools/',
};

export const getStandaloneUrl = (chainId: StandaloneType) => {
  if (API_ENV === 'prod') return '/';

  return stagingUrls[chainId];
};

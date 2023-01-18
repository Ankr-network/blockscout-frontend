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

export enum AvailableReadProviders {
  ethMainnetHttpProvider = 'ethMainnetHttpProvider',
  ethGoerliHttpProvider = 'ethGoerliHttpProvider',
  ftmOperaHttpProvider = 'ftmOperaHttpProvider',
  ftmTestnetHttpProvider = 'ftmTestnetHttpProvider',
  smartChainHttpProvider = 'smartChainHttpProvider',
  smartChainTestnetHttpProvider = 'smartChainTestnetHttpProvider',
}

export enum AvailableWriteProviders {
  ethCompatible = 'ethCompatible',
  polkadot = 'polkadot',
  binance = 'binance',
}

export enum BlockchainNetworkId {
  mainnet = 1,
  ropsten = 3,
  rinkeby = 4,
  goerli = 5,
  dev = 2018,
  classic = 61,
  mordor = 63,
  kotti = 6,
  smartchain = 56,
  smartchainTestnet = 97,
  avalanche = 43114,
  avalancheTestnet = 43113,
  polygon = 137,
  fantom = 250,
  fantomTestnet = 4002,
}

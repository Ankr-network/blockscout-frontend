export enum AvailableReadProviders {
  ethMainnet = 'ethMainnetHttpProvider',
  ethGoerli = 'ethGoerliHttpProvider',

  mumbai = 'polygonHttpWeb3KeyProvider',
  polygon = 'polygonHttpWeb3KeyProvider',

  avalancheChain = 'avalancheChainHttpProvider',
  avalancheChainTest = 'avalancheChainTestHttpProvider',

  binanceChain = 'binanceChainHttpProvider',
  binanceChainTest = 'binanceChainTestHttpProvider',

  ftmOpera = 'ftmOperaHttpProvider',
  ftmTestnet = 'ftmTestnetHttpProvider',
}

export enum AvailableWriteProviders {
  ethCompatible = 'ethCompatible',
  polkadotCompatible = 'polkadotCompatible',
}

export enum EEthereumNetworkId {
  // EVM Compatible
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
  mumbai = 80001,

  // Polkadot Compatible
  /**
   *  @deprecated
   */
  kusama = 'KSM',
  /**
   *  @deprecated
   */
  polkadot = 'DOT',
  /**
   *  @deprecated
   */
  rococo = 'ROC',
  /**
   *  @deprecated
   */
  westend = 'WND',
}

export enum EPolkadotNetworkId {
  kusama = 'KSM',
  polkadot = 'DOT',
  rococo = 'ROC',
  westend = 'WND',
}

export enum EWalletId {
  huobi = 'custom-huobi',
  imtoken = 'custom-imtoken',
  injected = 'injected',
  math = 'custom-math',
  trust = 'custom-trust',
  walletconnect = 'walletconnect',
}

export interface IProvider {
  isConnected(): boolean;
  connect(): Promise<void>;
  disconnect(): void;
}

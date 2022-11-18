export enum AvailableReadProviders {
  ethMainnet = 'ethMainnetHttpProvider',
  ethGoerli = 'ethGoerliHttpProvider',

  mumbai = 'polygonMumbaiHttpWeb3KeyProvider',
  polygon = 'polygonHttpWeb3KeyProvider',

  avalancheChain = 'avalancheChainHttpProvider',
  avalancheChainTest = 'avalancheChainTestHttpProvider',

  binanceChain = 'binanceChainHttpProvider',
  binanceChainTest = 'binanceChainTestHttpProvider',

  ftmOpera = 'ftmOperaHttpProvider',
  ftmTestnet = 'ftmTestnetHttpProvider',

  gnosis = 'gnosisHttpProvider',
  sokol = 'sokolHttpProvider',

  xdc = 'xdcMainnetHttpProvider',
  xdcTestnet = 'xdcTestnetHttpProvider',
}

export type Address = string;

export enum AvailableWriteProviders {
  ethCompatible = 'ethCompatible',
}

export enum EEthereumNetworkId {
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
  gnosis = 100,
  sokol = 77,
  xdc = 50,
  xdcTestnet = 51,
}

export enum EWalletId {
  huobi = 'custom-huobi',
  imtoken = 'custom-imtoken',
  injected = 'injected',
  math = 'custom-math',
  trust = 'custom-trust',
  trustViaWalletConnect = 'custom-trust-walletconnect',
  binanceWallet = 'custom-binance-wallet',
  coin98 = 'custom-coin98',
  walletconnect = 'walletconnect',
  coinbase = 'custom-coinbase',
  okxwallet = 'custom-okxwallet',
}

export interface IProvider {
  isConnected(): boolean;
  connect(): Promise<void>;
  disconnect(): void;
}

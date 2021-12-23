// semantic types
export type Timestamp = number;
export type Days = number;
export type Minutes = number;
export type Seconds = number;
export type Milliseconds = number;
export type Megabytes = number;
export type Percentage = number;
export type ETH = number;
export declare type Web3Address = string;

export enum Env {
  Develop = 'develop',
  Production = 'prod',
  Stage = 'staging',
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
}

export enum EParachainPolkadotNetwork {
  DOT = 'DOT',
  KSM = 'KSM',
  WND = 'WND',
  ROC = 'ROC',
}

export enum Provider {
  metamask = 'metamask',
  wallet = 'wallet',
  binance = 'binance',
}

export enum Blockchain {
  ethereum = 'ethereum',
  binance = 'binance',
  avalanche = 'avalanche',
}

export enum Locale {
  en = 'en-US',
  zh = 'zh-CN',
}

import { EEthereumNetworkId } from '@ankr.com/provider';

// semantic types
export type TAmountUnit = number;
export type TNumberAsString = string;
export type Timestamp = number;
export type Days = number;
export type Minutes = number;
export type Seconds = number;
export type Milliseconds = number;
export type Megabytes = number;
export type Percentage = number;
export type ETH = number;
export declare type Web3Address = string;
export type Web3Uint256 = string;
export type TTxHash = string;

export enum Env {
  Develop = 'develop',
  Production = 'prod',
  Stage = 'staging',
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

export { EEthereumNetworkId };

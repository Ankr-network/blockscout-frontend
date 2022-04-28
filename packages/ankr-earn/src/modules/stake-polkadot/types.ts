import { Token } from 'modules/common/types/token';

export type TPolkadotETHToken = Token.aDOTb | Token.aKSMb | Token.aWNDb;
export type TPolkadotToken = Token.DOT | Token.KSM | Token.WND;

export enum EPolkadotNetworks {
  DOT = 'DOT',
  KSM = 'KSM',
  WND = 'WND',
}

export enum EPolkadotNetworksMainnet {
  DOT = 'DOT',
  KSM = 'KSM',
}

export enum EPolkadotNetworksTestnet {
  WND = 'WND',
}

export enum EPolkadotETHReverseMap {
  DOT = Token.aDOTb,
  KSM = Token.aKSMb,
  WND = Token.aWNDb,
}

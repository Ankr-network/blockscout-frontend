import { Token } from 'modules/common/types/token';

export type TPolkadotToken = Token.DOT | Token.KSM | Token.WND;

export enum EPolkadotNetworks {
  DOT = 'DOT',
  KSM = 'KSM',
  WND = 'WND',
}

export enum EPolkadotETHReverseMap {
  DOT = Token.aDOTb,
  KSM = Token.aKSMb,
  WND = Token.aWNDb,
}

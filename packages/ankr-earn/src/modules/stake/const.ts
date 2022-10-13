import { Milliseconds, Seconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

import { EOpenOceanTokens } from './types';

export type UnstakableToken =
  | Token.AVAX
  | Token.BNB
  | Token.DOT
  | Token.ETH
  | Token.FTM
  | Token.KSM
  | Token.MATIC
  | Token.WND;

export const UNSTAKE_DAY_INTERVALS_BY_TOKEN: Record<UnstakableToken, string> = {
  [Token.AVAX]: '28',
  [Token.BNB]: '7-15',
  [Token.FTM]: '35',
  [Token.MATIC]: '3-4',
  [Token.DOT]: '28',
  [Token.KSM]: '7',
  [Token.WND]: '7',
  [Token.ETH]: '',
};

export const INPUT_DEBOUNCE_TIME: Milliseconds = 300;

export const MIN_STAKE_TRADE_INFO_DISCOUNT_VAL = 0.5;

export const UNSTAKE_UPDATE_INTERVAL: Seconds = 60;

export const nativeOpenOceanTokenMap: Record<
  EOpenOceanTokens,
  EOpenOceanTokens
> = {
  [EOpenOceanTokens.aAVAXb]: EOpenOceanTokens.AVAX,
  [EOpenOceanTokens.aAVAXc]: EOpenOceanTokens.AVAX,
  [EOpenOceanTokens.aBNBb]: EOpenOceanTokens.BNB,
  [EOpenOceanTokens.aBNBc]: EOpenOceanTokens.BNB,
  [EOpenOceanTokens.aETHb]: EOpenOceanTokens.ETH,
  [EOpenOceanTokens.aETHc]: EOpenOceanTokens.ETH,
  [EOpenOceanTokens.aFTMb]: EOpenOceanTokens.FTM,
  [EOpenOceanTokens.aFTMc]: EOpenOceanTokens.FTM,
  [EOpenOceanTokens.aMATICb]: EOpenOceanTokens.MATIC,
  [EOpenOceanTokens.aMATICc]: EOpenOceanTokens.MATIC,
};

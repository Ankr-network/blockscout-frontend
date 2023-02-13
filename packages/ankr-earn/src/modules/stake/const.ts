import { Milliseconds, Seconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

export type UnstakableToken =
  | Token.AVAX
  | Token.BNB
  | Token.DOT
  | Token.ETH
  | Token.FTM
  | Token.KSM
  | Token.MATIC
  | Token.WND
  | Token.SUI
  | Token.XDC;

export const UNSTAKE_DAY_INTERVALS_BY_TOKEN: Record<UnstakableToken, string> = {
  [Token.AVAX]: '28',
  [Token.BNB]: '7-10',
  [Token.FTM]: '35',
  [Token.MATIC]: '3-4',
  [Token.DOT]: '28',
  [Token.KSM]: '7',
  [Token.WND]: '7',
  [Token.ETH]: '',
  [Token.SUI]: '31-45',
  [Token.XDC]: '31-45',
};

export const INPUT_DEBOUNCE_TIME: Milliseconds = 300;

export const UNSTAKE_UPDATE_INTERVAL: Seconds = 60;

import { Milliseconds } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

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

export const INPUT_DEBOUNCE_TIME: Milliseconds = 1_000;

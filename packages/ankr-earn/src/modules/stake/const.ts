import { Days, Milliseconds, Seconds } from 'modules/common/types';
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

/**
 * Max AVAX unstake period in days
 */
export const AVAX_MAX_UNSTAKE_PERIOD: Days = 28;

/**
 * Max MATIC unstake period in days
 */
export const MATIC_MAX_UNSTAKE_PERIOD: Days = 4;

/**
 * Max BNB unstake period in days
 */
export const BNB_MAX_UNSTAKE_PERIOD: Days = 15;

/**
 * Max FTM unstake period in days
 */
export const FTM_MAX_UNSTAKE_PERIOD: Days = 35;

/**
 * Max XDC unstake period in days
 */
export const XDC_MAX_UNSTAKE_PERIOD: Days = 45;

export const UNSTAKE_DAY_INTERVALS_BY_TOKEN: Record<UnstakableToken, string> = {
  [Token.AVAX]: `${AVAX_MAX_UNSTAKE_PERIOD}`,
  [Token.BNB]: `7-${BNB_MAX_UNSTAKE_PERIOD}`,
  [Token.FTM]: `${FTM_MAX_UNSTAKE_PERIOD}`,
  [Token.MATIC]: `3-${MATIC_MAX_UNSTAKE_PERIOD}`,
  [Token.DOT]: '28',
  [Token.KSM]: '7',
  [Token.WND]: '7',
  [Token.ETH]: '',
  [Token.SUI]: '31-45',
  [Token.XDC]: `31-${XDC_MAX_UNSTAKE_PERIOD}`,
};

export const INPUT_DEBOUNCE_TIME: Milliseconds = 300;

export const UNSTAKE_UPDATE_INTERVAL: Seconds = 60;

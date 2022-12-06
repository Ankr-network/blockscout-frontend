import { featuresConfig, isMainnet } from 'modules/common/const';
import { Days } from 'modules/common/types';
import { Token } from 'modules/common/types/token';

import { TCalcToken } from './types';

export const DEFAULT_YIELD_DAYS_VALUE: Days = 177;

export const CALC_ACTIONS_PREFIX = 'calc/';

export const SUPPORTED_TOKENS = [
  Token.ETH,
  Token.BNB,
  Token.MATIC,
  Token.ANKR,
  Token.AVAX,
  Token.FTM,
  Token.mGNO,
  ...(isMainnet ? [Token.DOT, Token.KSM] : [Token.WND]),
  ...(featuresConfig.xdcStaking ? [Token.XDC] : []),
] as TCalcToken[];

export const DEFAULT_TOKENS_VALUE: Record<string, number> = {
  [Token.ETH]: 1,
  [Token.BNB]: 10,
  [Token.MATIC]: 1000,
};

import { Token } from 'modules/common/types/token';

type NativeToken =
  | Token.AVAX
  | Token.BNB
  | Token.ETH
  | Token.MATIC
  | Token.FTM
  | Token.DOT
  | Token.KSM
  | Token.WND;

export const getStakingOverviewUrl = (token: NativeToken): string =>
  `https://www.ankr.com/docs/staking/liquid-staking/${token.toLowerCase()}/overview `;

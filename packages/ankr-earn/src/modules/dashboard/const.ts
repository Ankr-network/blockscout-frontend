import { Token } from 'modules/common/types/token';

export const nativeTokenMap: Partial<Record<Token, Token>> = {
  [Token.aBNBc]: Token.BNB,
  [Token.aETHc]: Token.ETH,
  [Token.aFTMc]: Token.FTM,
  [Token.aMATICc]: Token.MATIC,
};

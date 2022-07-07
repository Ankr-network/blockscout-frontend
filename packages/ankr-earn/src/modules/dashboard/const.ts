import { Token } from 'modules/common/types/token';

export const nativeTokenMap: Partial<Record<Token, Token>> = {
  [Token.aAVAXc]: Token.AVAX,
  [Token.aBNBc]: Token.BNB,
  [Token.aETH]: Token.ETH,
  [Token.aETHc]: Token.ETH,
  [Token.aFTMc]: Token.FTM,
  [Token.aMATICc]: Token.MATIC,
};

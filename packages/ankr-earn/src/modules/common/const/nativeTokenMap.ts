import { Token } from '../types/token';

export const nativeTokenMap: Partial<Record<Token, Token>> = {
  [Token.aAVAXb]: Token.AVAX,
  [Token.aAVAXc]: Token.AVAX,
  [Token.aBNBb]: Token.BNB,
  [Token.aBNBc]: Token.BNB,
  [Token.aETH]: Token.ETH,
  [Token.aETHb]: Token.ETH,
  [Token.aETHc]: Token.ETH,
  [Token.aFTMb]: Token.FTM,
  [Token.aFTMc]: Token.FTM,
  [Token.aMATICb]: Token.MATIC,
  [Token.aMATICc]: Token.MATIC,
};

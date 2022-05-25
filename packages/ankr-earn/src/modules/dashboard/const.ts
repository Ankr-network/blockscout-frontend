import { Token } from 'modules/common/types/token';

export const nativeTokenMap: Partial<Record<Token, Token>> = {
  [Token.aETHc]: Token.ETH,
};

import { pairedTokensMap } from '../const';

export const getPairedToken = (
  fromToken: string,
  toToken?: string,
): string | undefined => {
  const pairedToken = pairedTokensMap[fromToken];

  if (typeof pairedToken === 'string') {
    return pairedToken;
  } else if (Array.isArray(pairedToken)) {
    const isAlreadyCompatible = toToken && pairedToken.find(t => t === toToken);

    if (isAlreadyCompatible) {
      return toToken;
    }

    return pairedToken[0];
  }

  return undefined;
};

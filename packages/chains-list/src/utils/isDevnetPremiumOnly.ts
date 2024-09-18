import { Chain } from '../types';

export const isDevnetPremiumOnly = (chain: Chain) => {
  return chain.devnets && chain?.devnets?.length > 0
    ? chain.devnets.every(devnet => devnet.premiumOnly)
    : false;
};

import { Chain } from '../types';

export const isTestnetPremiumOnly = (chain: Chain) => {
  return chain.testnets && chain?.testnets?.length > 0
    ? chain.testnets.every(testnet => testnet.premiumOnly)
    : false;
};

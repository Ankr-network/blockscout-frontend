import { USDTLogo, USDCLogo } from '@ankr.com/ui';

import { ECurrency } from 'modules/payments/types';

export const getStablecoinIcon = (currency: ECurrency) => {
  switch (currency) {
    case ECurrency.USDT:
      return <USDTLogo />;
    case ECurrency.USDC:
      return <USDCLogo />;
    default:
      return undefined;
  }
};

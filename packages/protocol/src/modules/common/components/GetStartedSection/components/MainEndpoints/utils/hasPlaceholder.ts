import { BlockchainType } from 'multirpc-sdk';

import { Chain } from 'modules/chains/types';

export const hasPlaceholder = (
  subchain?: Chain,
  hasPrivateAccess?: boolean,
) => {
  if (hasPrivateAccess) return false;

  const isMainnetForPremiumOnly =
    subchain?.type === BlockchainType.Mainnet && subchain?.isMainnetPremiumOnly;

  const isPremiumOnly = Boolean(subchain?.premiumOnly);

  return isPremiumOnly || isMainnetForPremiumOnly;
};

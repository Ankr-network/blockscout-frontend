import { BlockchainType } from 'multirpc-sdk';

import { IApiChain } from 'domains/chains/api/queryChains';

export const hasPlaceholder = (
  subchain?: IApiChain,
  hasPrivateAccess?: boolean,
) => {
  const isMainnetForPremiumOnly =
    subchain?.type === BlockchainType.Mainnet && subchain?.isMainnetPremiumOnly;

  const isPremiumOnly = Boolean(subchain?.premiumOnly);

  return !hasPrivateAccess && (isPremiumOnly || isMainnetForPremiumOnly);
};

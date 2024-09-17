import { EBlockchainType, Chain } from '@ankr.com/chains-list';

export const hasPlaceholder = (
  subchain?: Chain,
  hasPrivateAccess?: boolean,
) => {
  if (hasPrivateAccess) return false;

  const isMainnetForPremiumOnly =
    subchain?.type === EBlockchainType.Mainnet &&
    subchain?.isMainnetPremiumOnly;

  const isPremiumOnly = Boolean(subchain?.premiumOnly);

  return isPremiumOnly || isMainnetForPremiumOnly;
};

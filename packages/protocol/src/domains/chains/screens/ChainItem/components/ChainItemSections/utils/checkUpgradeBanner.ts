export interface CheckUpgradeBannerParams {
  hasPrivateAccess: boolean;
  hasPremium: boolean;
  isConnecting: boolean;
}

export const checkUpgradeBanner = ({
  hasPremium,
  hasPrivateAccess,
  isConnecting,
}: CheckUpgradeBannerParams) =>
  !((hasPrivateAccess && hasPremium) || isConnecting);

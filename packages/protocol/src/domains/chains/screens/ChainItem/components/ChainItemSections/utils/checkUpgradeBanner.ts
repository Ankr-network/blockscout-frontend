export interface CheckUpgradeBannerParams {
  hasPrivateAccess: boolean;
  hasPremium: boolean;
  isConnecting: boolean;
}

export const checkUpgradeBanner = ({
  hasPrivateAccess,
  hasPremium,
  isConnecting,
}: CheckUpgradeBannerParams) =>
  !((hasPrivateAccess && hasPremium) || isConnecting);

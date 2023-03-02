export interface CheckUpgradeBannerParams {
  hasPrivateAccess: boolean;
  isConnecting: boolean;
}

export const checkUpgradeBanner = ({
  hasPrivateAccess,
  isConnecting,
}: CheckUpgradeBannerParams) => !(hasPrivateAccess || isConnecting);

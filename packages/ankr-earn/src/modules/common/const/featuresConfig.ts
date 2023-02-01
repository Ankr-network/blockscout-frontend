import { isLocal, isMainnet } from './env';

export const featuresConfig = {
  testingUi: !isMainnet || isLocal,
  isActiveClaimNotification: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActivePolkadotLedgerNanoX: true,
  isActiveSSVDashboardAddToken: !isMainnet,
  /**
   * BFF (Backend For Frontend)
   *
   * This flag enables proxy URLs with premium access for ANKR MRPC
   * and AAPI services.
   */
  isBffEnabled: true,
  /**
   * Please remove extra feature flag
   * @deprecated
   */
  isActiveStakeTradeInfo: true,
  localeSwitcher: false,
  bridgeAnotherAddr: false,
  /**
   * Please remove extra feature flag
   * @deprecated
   */
  ankrStaking: true,
  /**
   * TODO Please remove it when actual translation would be added
   */
  fantomUnstakeFeeTooltip: false,
  /**
   * Is enabled only for mainnet since Sokol testnet is not availble.
   */
  mgnoStaking: isMainnet,
  /**
   * Please remove extra feature flag
   * @deprecated
   */
  maticPolygonStaking: true,
  isCalcActive: true,
  isReferralLinkActive: false,
  /**
   * Please remove extra feature flag
   */
  ssvStaking: true,
  duneAnalyticsLink: true,
  xdcActive: !isMainnet,
  xdcStaking: false,
  /**
   * Issue https://ankrnetwork.atlassian.net/browse/STAKAN-2242
   */
  isCoin98SupportActive: true,
  /**
   * Issue https://ankrnetwork.atlassian.net/browse/STAKAN-2262
   */
  isTrustWalletSupportActive: true,
  isSUIStakingActive: isLocal,
  disableHeavyRequestsForTestnet: !isMainnet,
  isTradeInfoActiveForBnb: false,
  isKusamaStakingActive: false,
  /**
   * Disable this feature until all fixes are completed.
   * https://ankrnetwork.atlassian.net/browse/STAKAN-2030
   */
  isSmallBalancesActive: true,
  /**
   * Temporary disable polkadot staking/unstaking
   * https://ankrnetwork.atlassian.net/browse/STAKAN-2431
   */
  isPolkadotMaintenanceActive: true,
};

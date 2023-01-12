import { Env } from '../types';

import { currentEnv, isLocal } from './env';

export const featuresConfig = {
  testingUi: currentEnv !== Env.Production,
  isActiveClaimNotification: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActivePolkadotLedgerNanoX: true,
  isActiveSSVDashboardAddToken: currentEnv !== Env.Production,
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
  mgnoStaking: true,
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
  xdcActive: currentEnv !== Env.Production,
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
  disableHeavyRequestsForTestnet: currentEnv !== Env.Production,
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

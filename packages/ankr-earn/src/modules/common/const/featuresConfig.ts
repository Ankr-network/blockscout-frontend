import { Env } from '../types';

import { currentEnv, isLocal } from './env';

export const featuresConfig = {
  testingUi: currentEnv !== Env.Production,
  isActiveClaimNotification: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActivePolkadotLedgerNanoX: true,
  isActiveSSVDashboardAddToken: currentEnv !== Env.Production,
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
  isActivePolkadotClaiming: true,
  /**
   * Please remove extra feature flag
   * @deprecated
   */
  isActivePolkadotStaking: true,
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
  xdcStaking: currentEnv !== Env.Production,
  /**
   * Issue https://ankrnetwork.atlassian.net/browse/STAKAN-2242
   */
  isCoin98SupportActive: true,
  /**
   * Issue https://ankrnetwork.atlassian.net/browse/STAKAN-2262
   */
  isTrustWalletSupportActive: true,
  isSUIStakingActive: isLocal,
  isClaimAndRestakeEnabled: currentEnv !== Env.Production,
  /**
   * https://ankrnetwork.atlassian.net/browse/STAKAN-2365
   */
  suspendBanner: true,
  isBnbServiceDisabled: true,
};

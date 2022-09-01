import { Env } from '../types';

import { currentEnv, isLocal } from './env';

export const featuresConfig = {
  testingUi: currentEnv !== Env.Production,
  isActiveClaimNotification: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActivePolkadotLedgerNanoX: true,
  /**
   * Please remove extra feature flag
   * @deprecated
   */
  isActiveStakeTradeInfo: true,
  localeSwitcher: false,
  dashboardLiquidCrowdloanAssets: false,
  bridgeAnotherAddr: false,
  showOldBanner: false,
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
  mgnoStaking: currentEnv !== Env.Production,
  /**
   * Please remove extra feature flag
   * @deprecated
   */
  maticPolygonStaking: true,
  maticPolygonStakingFAQ: false,
  /**
   * https://ankrnetwork.atlassian.net/browse/STAKAN-1810
   */
  newEmptyStateForDashboard: isLocal,
  isCalcActive: isLocal,
};

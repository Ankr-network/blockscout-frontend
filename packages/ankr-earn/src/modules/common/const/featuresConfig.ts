import { Env } from '../types';

import { currentEnv, isLocal } from './env';

export const featuresConfig = {
  testingUi: currentEnv !== Env.Production,
  isActiveClaimNotification: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActivePolkadotLedgerNanoX: false,
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
  newDashboard: isLocal,
  /**
   * Please remove extra feature flag
   * @deprecated
   */
  ankrStaking: true,
  mgnoStaking: currentEnv !== Env.Production,
  maticPolygonStaking: isLocal,
};

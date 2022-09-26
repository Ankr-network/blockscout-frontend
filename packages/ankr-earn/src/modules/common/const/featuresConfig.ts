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
  isReferralDashboardActive: isLocal,
  providerNotification: true,
  newStakingHistoryDialog: isLocal,
};

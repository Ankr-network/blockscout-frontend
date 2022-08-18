import { Env } from '../types';

import { currentEnv, isLocal } from './env';

export const featuresConfig = {
  testingUi: currentEnv !== Env.Production,
  isActiveClaimNotification: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActivePolkadotLedgerNanoX: false,
  isActiveStakeTradeInfo: true,
  localeSwitcher: false,
  dashboardLiquidCrowdloanAssets: false,
  bridgeAnotherAddr: false,
  showOldBanner: false,
  isActivePolkadotClaiming: true,
  isActivePolkadotStaking: true,
  newDashboard: isLocal,
  ankrStaking: true,
  mgnoStaking: currentEnv !== Env.Production,
  maticPolygonStaking: isLocal,
};

import { Env } from '../types';

import { currentEnv, isLocal } from './env';

export const featuresConfig = {
  testingUi: currentEnv !== Env.Production,
  isActiveClaimNotification: false,
  isActiveMyRewardsClaimModalNewParts: false,
  isActivePolkadotLedgerNanoX: false,
  isActiveStakeTradeInfo: true,
  liquidityMining: false,
  localeSwitcher: false,
  dashboardLiquidCrowdloanAssets: false,
  bridgeAnotherAddr: false,
  showOldBanner: false,
  dashboardNativeAmount: false,
  // ! only for testing purpose
  stakeETHWithoutClaim: currentEnv !== Env.Production,
  isActivePolkadotClaiming: true,
  isActivePolkadotStaking: true,
  newDashboard: isLocal,
  ankrStaking: true,
  mgnoStaking: currentEnv !== Env.Production,
  maticLandingLink: currentEnv !== Env.Production,
  maticPolygonStaking: isLocal,
};

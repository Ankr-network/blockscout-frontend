import { currentEnv } from 'modules/common/const';
import { BlockchainNetworkId, Env, Percentage } from 'modules/common/types';
import { AvailableProviders } from 'provider/providerManager/types';

export const POLYGON_PROVIDER_ID = AvailableProviders.ethCompatible;

export const MATIC_STAKING_NETWORKS = [
  currentEnv === Env.Production
    ? BlockchainNetworkId.mainnet
    : BlockchainNetworkId.goerli,
];

export const YEARLY_INTEREST: Percentage = 12;
export const MATIC_STAKING_AMOUNT_STEP = 0.1;
export const UNSTAKE_TIME_WAIT_HOURS = 25;

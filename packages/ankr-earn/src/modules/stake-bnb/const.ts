import { currentEnv } from 'modules/common/const';
import { BlockchainNetworkId, Env, Percentage } from 'modules/common/types';
import { AvailableProviders } from 'provider/providerManager/types';

export const BINANCE_PROVIDER_ID = AvailableProviders.ethCompatible;

export const BNB_STAKING_NETWORKS = [
  currentEnv === Env.Production
    ? BlockchainNetworkId.smartchain
    : BlockchainNetworkId.smartchainTestnet,
];

export const YEARLY_INTEREST: Percentage = 12;
export const BNB_STAKING_AMOUNT_STEP = 0.1;
export const UNSTAKE_TIME_WAIT_HOURS = 25;

import { currentEnv } from 'modules/common/const';
import { BlockchainNetworkId, Env } from 'modules/common/types';
import { AvailableProviders } from 'provider/providerManager/types';

export const FANTOM_STAKING_NETWORKS = [
  currentEnv === Env.Production
    ? BlockchainNetworkId.fantom
    : BlockchainNetworkId.fantomTestnet,
];

export const FANTOM_PROVIDER_ID = AvailableProviders.ethCompatible;

// todo: to clarify whether this value is correct
export const YEARLY_INTEREST = 4.8;
// todo: to clarify whether this value is correct
export const FANTOM_STAKING_AMOUNT_STEP = 0.1;

import { currentEnv, isMainnet } from 'modules/common/const';
import { BlockchainNetworkId, Env, Percentage } from 'modules/common/types';
import { AvailableProviders } from 'provider/providerManager/types';

export const BINANCE_PROVIDER_ID = AvailableProviders.ethCompatible;

export const BNB_STAKING_NETWORKS = [
  currentEnv === Env.Production
    ? BlockchainNetworkId.smartchain
    : BlockchainNetworkId.smartchainTestnet,
];

// Note: Mainnet = ~7 days. Testnet = ~4 hours
export const ABNBB_REDEEM_PERIOD = isMainnet ? 7 : 4;

export const BNB_STAKING_AMOUNT_STEP = 0.1;
export const YEARLY_INTEREST: Percentage = 12;

import { t } from '@ankr.com/common';

import { NetworkName } from '../../types';

export const networkLabelsMap: Record<NetworkName, () => string> = {
  mainnet: () => t('chain-item.chain-types.mainnet'),
  testnet: () => t('chain-item.chain-types.testnet'),
  devnet: () => t('chain-item.chain-types.devnet'),
  beaconsMainnet: () => t('chain-item.chain-types.beacons-mainnet'),
  beaconsTestnet: () => t('chain-item.chain-types.beacons-testnet'),
  opnodesMainnet: () => t('chain-item.chain-types.opnodes-mainnet'),
  opnodesTestnet: () => t('chain-item.chain-types.opnodes-testnet'),
};

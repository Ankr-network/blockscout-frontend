import { ChainType } from '@ankr.com/chains-list';

import { GroupedEndpoints } from 'modules/endpoints/types';

type Map = Record<ChainType, keyof GroupedEndpoints>;

export const chainTypeToEndpointsKeyMap: Map = {
  [ChainType.Devnet]: 'devnet',
  [ChainType.Mainnet]: 'mainnet',
  [ChainType.Testnet]: 'testnet',
};

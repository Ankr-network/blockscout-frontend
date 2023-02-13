import { AvailableStakingWriteProviders } from 'modules/common/types';

import { IWalletItem } from './hooks/useAuthWallets';

const PLUS_BTN_MAX_NETWORKS = 2;

export const shouldShowAddWalletBtn = (
  networks: IWalletItem[],
  walletsGroupTypes?: AvailableStakingWriteProviders[],
): boolean => {
  return !!walletsGroupTypes?.length && networks.length < PLUS_BTN_MAX_NETWORKS;
};

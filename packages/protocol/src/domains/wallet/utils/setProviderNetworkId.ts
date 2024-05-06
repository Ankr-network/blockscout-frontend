import { EWalletId } from '@ankr.com/provider';

import { AppDispatch } from 'store';
import { getProviderManager } from 'modules/api/getProviderManager';
import { setNetworkId } from 'domains/wallet/store/walletSlice';

// TODO: use this function to set the network id in the store when other chains will be supported
export const setProviderNetworkId = async (dispatch: AppDispatch) => {
  try {
    const providerManager = getProviderManager();
    const ethProvider = await providerManager.getETHWriteProvider(
      EWalletId.injected,
    );
    const currentNetworkId = ethProvider.currentChain;

    dispatch(setNetworkId(currentNetworkId));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('setCurrentNetworkId error', error);
  }
};

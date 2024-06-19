import { EWalletId } from '@ankr.com/provider';

import { getProviderManager } from 'modules/api/getProviderManager';

import { isAbstractProvider } from './isAbstractProvider';

export const connectAccount = async () => {
  const providerManager = getProviderManager();
  const provider = await providerManager.getETHWriteProvider(
    EWalletId.injected,
  );
  const { currentProvider } = provider.getWeb3();

  if (isAbstractProvider(currentProvider) && currentProvider.request) {
    await currentProvider.request({
      method: 'wallet_requestPermissions',
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  }

  return provider.currentAccount;
};

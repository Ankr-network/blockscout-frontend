import { EWalletId } from '@ankr.com/provider';

import { getProviderManager } from 'modules/api/getProviderManager';

import { isAbstractProvider } from './isAbstractProvider';

export interface IConnectAccountParams {
  onError?: (error: unknown) => void;
}

export const connectAccount = async ({
  onError,
}: IConnectAccountParams = {}) => {
  const providerManager = getProviderManager();
  const provider = await providerManager.getETHWriteProvider(
    EWalletId.injected,
  );
  const { currentProvider } = provider.getWeb3();

  if (isAbstractProvider(currentProvider) && currentProvider.request) {
    try {
      await currentProvider.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
    } catch (error) {
      onError?.(error);
    }
  }

  return provider.currentAccount;
};

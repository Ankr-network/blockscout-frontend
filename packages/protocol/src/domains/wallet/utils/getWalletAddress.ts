import { EWalletId } from '@ankr.com/provider';

import { getProviderManager } from 'modules/api/getProviderManager';

export const getWalletAddress = async () => {
  const providerManager = getProviderManager();

  const provider = await providerManager.getETHWriteProvider(
    EWalletId.injected,
  );

  const { currentAccount: walletAddress } = provider;

  return walletAddress;
};

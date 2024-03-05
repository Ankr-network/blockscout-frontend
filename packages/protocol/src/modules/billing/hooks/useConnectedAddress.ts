import { EWalletId, ProviderEvents } from '@ankr.com/provider';
import { provider as Provider } from 'web3-core';
import { useEffect, useState } from 'react';

import { isEventProvider } from 'store/utils/isEventProvider';
import { getProviderManager } from 'modules/api/getProviderManager';

export const useConnectedAddress = () => {
  const [connectedAddress, setConnectedAddress] = useState<string>();
  const [walletIcon, setWalletIcon] = useState<string>();

  useEffect(() => {
    let walletProvider: Provider;

    (async () => {
      const providerManager = getProviderManager();
      const provider = await providerManager.getETHWriteProvider(
        EWalletId.injected,
      );

      walletProvider = provider.getWeb3().currentProvider;

      if (isEventProvider(walletProvider)) {
        walletProvider.on(
          ProviderEvents.AccountsChanged,
          (connectedAddresses: string[]) => {
            const newConnectedAddress = connectedAddresses?.[0];

            setConnectedAddress(newConnectedAddress);
          },
        );
      }

      setConnectedAddress(provider.currentAccount);
      setWalletIcon(provider.getWalletMeta().icon);
    })();

    return () => {
      if (isEventProvider(walletProvider)) {
        walletProvider.removeAllListeners(ProviderEvents.AccountsChanged);
      }
    };
  }, []);

  return { connectedAddress, walletIcon };
};

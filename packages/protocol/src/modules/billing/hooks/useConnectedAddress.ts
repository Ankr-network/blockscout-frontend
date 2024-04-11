import { EWalletId, ProviderEvents } from '@ankr.com/provider';
import { provider as Provider } from 'web3-core';
import { useEffect, useState } from 'react';

import { getProviderManager } from 'modules/api/getProviderManager';
import { isEventProvider } from 'store/utils/isEventProvider';

export interface IUseConnectedAddressProps {
  onAccountsChanged?: () => void;
}

export const useConnectedAddress = ({
  onAccountsChanged,
}: IUseConnectedAddressProps | void = {}) => {
  const [connectedAddress, setConnectedAddress] = useState<string>();
  const [walletIcon, setWalletIcon] = useState<string>();

  useEffect(() => {
    let walletProvider: Provider;

    let listener: (connectedAddresses: string[]) => void;

    (async () => {
      const providerManager = getProviderManager();
      const provider = await providerManager.getETHWriteProvider(
        EWalletId.injected,
      );

      walletProvider = provider.getWeb3().currentProvider;

      if (isEventProvider(walletProvider)) {
        listener = async (connectedAddresses: string[]) => {
          const newConnectedAddress = connectedAddresses?.[0];

          provider.currentAccount = newConnectedAddress;

          setConnectedAddress(newConnectedAddress);

          onAccountsChanged?.();
        };

        walletProvider.on(ProviderEvents.AccountsChanged, listener);
      }

      setConnectedAddress(provider.currentAccount);
      setWalletIcon(provider.getWalletMeta().icon);
    })();

    return () => {
      if (isEventProvider(walletProvider)) {
        walletProvider.removeListener(
          ProviderEvents.AccountsChanged,
          listener as () => void,
        );
      }
    };
  }, [onAccountsChanged]);

  return { connectedAddress, walletIcon };
};

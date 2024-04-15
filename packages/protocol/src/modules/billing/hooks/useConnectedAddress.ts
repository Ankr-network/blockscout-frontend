import {
  EthereumWeb3KeyProvider,
  EWalletId,
  ProviderEvents,
} from '@ankr.com/provider';
import { provider as Provider } from 'web3-core';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getProviderManager } from 'modules/api/getProviderManager';
import { hasMetamask } from 'domains/auth/utils/hasMetamask';
import { isEventProvider } from 'store/utils/isEventProvider';
import { createWeb3Service } from 'domains/auth/actions/connect/createWeb3Service';
import { useHasWeb3Service } from 'domains/auth/hooks/useHasWeb3Service';
import { INJECTED_WALLET_ID } from 'modules/api/MultiService';

export interface IUseConnectedAddressProps {
  onAccountsChanged?: () => void;
}

export const useConnectedAddress = ({
  onAccountsChanged,
}: IUseConnectedAddressProps | void = {}) => {
  const [connectedAddress, setConnectedAddress] = useState<string>();
  const [walletIcon, setWalletIcon] = useState<string>();

  const dispatch = useDispatch();

  const { hasWeb3Service } = useHasWeb3Service();

  useEffect(() => {
    let walletProvider: Provider;

    let listener: (connectedAddresses: string[]) => void;

    (async () => {
      if (hasMetamask()) {
        const providerManager = getProviderManager();
        let provider: EthereumWeb3KeyProvider | undefined;

        try {
          provider = await providerManager.getETHWriteProvider(
            EWalletId.injected,
          );
        } catch (error) {
          if (!hasWeb3Service) {
            dispatch(
              createWeb3Service.initiate({
                params: { walletId: INJECTED_WALLET_ID },
              }),
            );
          }
        }

        if (provider) {
          walletProvider = provider.getWeb3().currentProvider;

          if (isEventProvider(walletProvider)) {
            listener = async (connectedAddresses: string[]) => {
              const newConnectedAddress = connectedAddresses?.[0];

              if (provider) {
                provider.currentAccount = newConnectedAddress;
              }

              setConnectedAddress(newConnectedAddress);
            };

            walletProvider.on(ProviderEvents.AccountsChanged, listener);

            if (onAccountsChanged) {
              walletProvider.on(
                ProviderEvents.AccountsChanged,
                onAccountsChanged,
              );
            }
          }

          setConnectedAddress(provider.currentAccount);
          setWalletIcon(provider.getWalletMeta().icon);
        }
      }
    })();

    return () => {
      if (isEventProvider(walletProvider)) {
        walletProvider.removeListener(
          ProviderEvents.AccountsChanged,
          listener as () => void,
        );

        if (onAccountsChanged) {
          walletProvider.removeListener(
            ProviderEvents.AccountsChanged,
            onAccountsChanged,
          );
        }
      }
    };
  }, [dispatch, onAccountsChanged, hasWeb3Service]);

  return { connectedAddress, walletIcon };
};

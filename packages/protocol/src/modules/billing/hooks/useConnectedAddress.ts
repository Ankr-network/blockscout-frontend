import { EWalletId, ProviderEvents } from '@ankr.com/provider';
import { provider as Provider } from 'web3-core';
import { t } from '@ankr.com/common';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { getProviderManager } from 'modules/api/getProviderManager';
import { hasMetamask } from 'domains/auth/utils/hasMetamask';
import { isEventProvider } from 'store/utils/isEventProvider';

export interface IUseConnectedAddressProps {
  onAccountsChanged?: () => void;
}

const { showNotification } = NotificationActions;

export const useConnectedAddress = ({
  onAccountsChanged,
}: IUseConnectedAddressProps | void = {}) => {
  const [connectedAddress, setConnectedAddress] = useState<string>();
  const [walletIcon, setWalletIcon] = useState<string>();

  const dispatch = useDispatch();

  useEffect(() => {
    let walletProvider: Provider;

    let listener: (connectedAddresses: string[]) => void;

    (async () => {
      if (hasMetamask()) {
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
      } else {
        dispatch(
          showNotification({
            message: t('error.no-metamask'),
            severity: 'error',
          }),
        );
      }
    })();

    return () => {
      if (isEventProvider(walletProvider)) {
        walletProvider.removeListener(
          ProviderEvents.AccountsChanged,
          listener as () => void,
        );
      }
    };
  }, [dispatch, onAccountsChanged]);

  return { connectedAddress, walletIcon };
};

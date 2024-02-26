import { ProviderEvents } from '@ankr.com/provider';
import { useEffect, useState } from 'react';

import { MultiService } from 'modules/api/MultiService';
import { isEventProvider } from 'store/utils/isEventProvider';

export const useConnectedAddress = () => {
  const service = MultiService.getWeb3Service();

  const provider = service.getKeyWriteProvider();
  const { currentAccount } = provider;

  const [connectedAddress, setConnectedAddress] = useState(currentAccount);

  useEffect(
    () => {
      const walletProvider = provider.getWeb3()?.currentProvider;

      if (isEventProvider(walletProvider)) {
        walletProvider.on(
          ProviderEvents.AccountsChanged,
          (connectedAddresses: string[]) => {
            const newConnectedAddress = connectedAddresses?.[0];

            setConnectedAddress(newConnectedAddress);
          },
        );

        return () => {
          walletProvider.removeAllListeners(ProviderEvents.AccountsChanged);
        };
      }

      return () => {};
    },
    // this effect is not relied on provider changes
    // eslint-disable-next-line
    [],
  );

  return { connectedAddress };
};

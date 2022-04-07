import { useDispatchRequest } from '@redux-requests/react';

import { AvailableWriteProviders } from 'provider';

import { disconnect } from 'modules/auth/actions/disconnect';
import { updateAccountAddress } from 'modules/auth/actions/updateAccountAddress';
import { useWalletsGroupTypes } from 'modules/auth/hooks/useWalletsGroupTypes';

import { IAddress, TAddresses } from '../types';

interface IUseAuthWalletsData {
  wallets: IWalletItem[];
  walletsGroupTypes?: AvailableWriteProviders[];
}

export interface IWalletItem {
  addresses: TAddresses;
  network: string;
  onAddressUpdate: (address: string) => void;
  onDisconnect: () => void;
}

export const useAuthWallets = (): IUseAuthWalletsData => {
  const dispatchRequest = useDispatchRequest();

  const wallets: IWalletItem[] = [];

  const { walletsGroupTypes } = useWalletsGroupTypes({
    postProcessingFn: (providerKey, data): void => {
      const addresses: IAddress[] = data.addresses.length
        ? (data.addresses as string[]).map(address => ({
            address,
            isActive: address === data.address,
            tokenIconSrc: data.walletIcon ?? '',
          }))
        : [
            {
              address: data.address,
              isActive: true,
              tokenIconSrc: data.walletIcon ?? '',
            },
          ];

      wallets.push({
        addresses,
        network: data.walletName,
        onAddressUpdate: (address: string): void => {
          if (providerKey !== AvailableWriteProviders.polkadotCompatible) {
            return;
          }

          dispatchRequest(
            updateAccountAddress({
              address,
              providerId: providerKey,
            }),
          );
        },
        onDisconnect: (): void => {
          dispatchRequest(disconnect(providerKey));
        },
      });
    },
  });

  return {
    wallets,
    walletsGroupTypes,
  };
};

import { useDispatchRequest } from '@redux-requests/react';
import { useMemo } from 'react';

import { disconnect } from 'modules/auth/common/actions/disconnect';
import { updateAccountAddress } from 'modules/auth/common/actions/updateAccountAddress';
import { useWalletsGroupTypes } from 'modules/auth/common/hooks/useWalletsGroupTypes';

import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
} from '../../common/types';
import { IAddress, TAddresses } from '../types';

interface IUseAuthWalletsData {
  wallets: IWalletItem[];
  walletsGroupTypes?: AvailableStakingWriteProviders[];
}

export interface IWalletItem {
  addresses: TAddresses;
  network: string;
  onAddressUpdate: (address: string) => void;
  onDisconnect: () => void;
}

export const useAuthWallets = (): IUseAuthWalletsData => {
  const dispatchRequest = useDispatchRequest();

  const { connectedProvidersData, walletsGroupTypes } = useWalletsGroupTypes();

  const wallets = useMemo(() => {
    if (connectedProvidersData === null) {
      return [];
    }

    const resultData: IWalletItem[] = [];

    for (let i = 0; i < connectedProvidersData.length; i += 1) {
      const providerData = connectedProvidersData[i];
      const { providerId } = providerData;

      const addresses: IAddress[] = providerData.addresses.length
        ? (providerData.addresses as string[]).map(address => ({
            address,
            isActive: address === providerData.address,
            tokenIconSrc: providerData.walletIcon ?? '',
          }))
        : [
            {
              address: providerData.address,
              isActive: true,
              tokenIconSrc: providerData.walletIcon ?? '',
            },
          ];

      resultData.push({
        addresses,
        network: providerData.walletName,
        onAddressUpdate: (address: string): void => {
          if (providerId !== ExtraWriteProviders.polkadotCompatible) {
            return;
          }

          dispatchRequest(
            updateAccountAddress({
              address,
              providerId,
            }),
          );
        },
        onDisconnect: (): void => {
          dispatchRequest(disconnect(providerId));
        },
      });
    }

    return resultData;
  }, [connectedProvidersData, dispatchRequest]);

  return {
    wallets,
    walletsGroupTypes,
  };
};

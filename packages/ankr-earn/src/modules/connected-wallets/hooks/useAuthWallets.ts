import { useMemo } from 'react';
import { store } from 'store';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useDisconnectMutation } from 'modules/auth/common/actions/disconnect';
import { useWalletsGroupTypes } from 'modules/auth/common/hooks/useWalletsGroupTypes';
import { useChangePolkadotWalletMutation } from 'modules/auth/polkadot/actions/changeWallet';

import {
  IProviderStatus,
  selectProvidersData,
  setProviderStatus,
} from '../../auth/common/store/authSlice';
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
  const [changePolkadotWallet] = useChangePolkadotWalletMutation();
  const [disconnectEth] = useDisconnectMutation({
    fixedCacheKey: AvailableWriteProviders.ethCompatible,
  });
  const [disconnectPolkadot] = useDisconnectMutation({
    fixedCacheKey: ExtraWriteProviders.polkadotCompatible,
  });
  const [disconnectSui] = useDisconnectMutation({
    fixedCacheKey: ExtraWriteProviders.suiCompatible,
  });

  const { connectedProvidersData, notConnectedWalletTypes: walletsGroupTypes } =
    useWalletsGroupTypes();

  const wallets = useMemo(() => {
    if (connectedProvidersData === null) {
      return [];
    }

    const resultData: IWalletItem[] = [];

    for (let i = 0; i < connectedProvidersData.length; i += 1) {
      const providerData = connectedProvidersData[i];
      const { providerId } = providerData;

      const addresses: IAddress[] = providerData.addresses?.length
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
          const providersData = selectProvidersData(store.getState());
          const currProviderState: IProviderStatus | undefined =
            providersData[providerId];

          changePolkadotWallet(address);

          // TODO: use RTKQ instead
          store.dispatch(
            setProviderStatus({
              ...currProviderState,
              providerId,
              address,
            }),
          );
        },
        onDisconnect: (): void => {
          switch (providerId) {
            case ExtraWriteProviders.polkadotCompatible:
              disconnectPolkadot(providerId);
              break;
            case ExtraWriteProviders.suiCompatible:
              disconnectSui(providerId);
              break;
            case AvailableWriteProviders.ethCompatible:
            default:
              disconnectEth(providerId);
              break;
          }
        },
      });
    }

    return resultData;
  }, [
    connectedProvidersData,
    disconnectEth,
    disconnectSui,
    disconnectPolkadot,
  ]);

  return {
    wallets,
    walletsGroupTypes,
  };
};

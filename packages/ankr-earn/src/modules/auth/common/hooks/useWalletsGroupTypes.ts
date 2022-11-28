import { PersistPartial } from 'redux-persist/es/persistReducer';

import { Address, AvailableWriteProviders } from '@ankr.com/provider';

import {
  AvailableStakingWriteProviders,
  ExtraWriteProviders,
} from 'modules/common/types';
import { useAppSelector } from 'store/useAppSelector';

import { IAuthSlice, selectProvidersData } from '../store/authSlice';

interface IExistProviderData {
  address: string;
  addresses: Address[];
  isActive: boolean;
  providerId: AvailableStakingWriteProviders;
  chainId: number | string | null;
  walletId?: string;
  wallet?: string;
  walletIcon?: string;
  walletName: string;
}

type TConnectData = IExistProviderData | null;
type TConnectedProvidersData = IExistProviderData[] | null;

interface IUseWalletsGroupTypesProps {
  writeProviderId?: AvailableStakingWriteProviders;
}

interface IUseWalletsGroupTypesData {
  connectedProvidersData: TConnectedProvidersData;
  notConnectedWalletTypes?: AvailableStakingWriteProviders[];
  writeProviderData: TConnectData;
}

const PERSIST_DEFAULT_KEY = '_persist';

const AVAILABLE_WALLETS_GROUP_TYPES = [
  AvailableWriteProviders.ethCompatible,
  ExtraWriteProviders.polkadotCompatible,
];

const getConnectData = (
  queriesData: IAuthSlice & PersistPartial,
  providerKey: AvailableWriteProviders,
): TConnectData => {
  return (queriesData[providerKey] as IExistProviderData) ?? null;
};

export const useWalletsGroupTypes = ({
  writeProviderId,
}: IUseWalletsGroupTypesProps = {}): IUseWalletsGroupTypesData => {
  const providersData = useAppSelector(selectProvidersData);

  const availableToConnectWalletTypes = [...AVAILABLE_WALLETS_GROUP_TYPES];

  const providersDataKeys = Object.keys(providersData).filter(
    providerName => providerName !== PERSIST_DEFAULT_KEY,
  );

  let connectedProvidersData: TConnectedProvidersData = null;
  let writeProviderData: TConnectData = null;

  for (let i = 0; i < providersDataKeys.length; i += 1) {
    const providerKey = providersDataKeys[i] as AvailableWriteProviders;
    const data = getConnectData(providersData, providerKey);

    if (providerKey === writeProviderId) {
      writeProviderData = data;
    }

    if (data === null || !data.isActive) {
      // eslint-disable-next-line no-continue
      continue;
    }

    connectedProvidersData =
      connectedProvidersData === null
        ? [data]
        : [...connectedProvidersData, data];

    availableToConnectWalletTypes.splice(
      availableToConnectWalletTypes.findIndex(
        groupType => groupType === providerKey,
      ),
      1,
    );
  }

  const isFullWalletsGroupTypes =
    AVAILABLE_WALLETS_GROUP_TYPES.length ===
    availableToConnectWalletTypes.length;

  return {
    connectedProvidersData,
    notConnectedWalletTypes:
      isFullWalletsGroupTypes || !availableToConnectWalletTypes.length
        ? undefined
        : availableToConnectWalletTypes,
    writeProviderData,
  };
};

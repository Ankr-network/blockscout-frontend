import { AvailableWriteProviders } from '@ankr.com/provider-core';
import { QueryState } from '@redux-requests/core';

import { useAppSelector } from 'store/useAppSelector';

import { IConnect } from '../actions/connect';
import { AVAILABLE_WALLETS_GROUP_TYPES } from '../components/ConnectWalletsModal';
import { selectProvidersData, selectQueriesData } from '../store/authSlice';
import { getFullAuthRequestKey } from '../utils/getAuthRequestKey';

type TConnectData = IConnect | null;
type TConnectedProvidersData = IConnect[] | null;

interface IUseWalletsGroupTypesProps {
  writeProviderId?: AvailableWriteProviders;
}

interface IUseWalletsGroupTypesData {
  connectedProvidersData: TConnectedProvidersData;
  walletsGroupTypes?: AvailableWriteProviders[];
  writeProviderData: TConnectData;
}

interface IQueryData {
  [queryKey: string]: QueryState<IConnect> | undefined;
}

const PERSIST_DEFAULT_KEY = '_persist';

const getConnectData = (
  queriesData: IQueryData,
  providerKey: AvailableWriteProviders,
): TConnectData => {
  const queryKey = getFullAuthRequestKey(providerKey);

  return queriesData[queryKey]?.data ?? null;
};

export const useWalletsGroupTypes = ({
  writeProviderId,
}: IUseWalletsGroupTypesProps = {}): IUseWalletsGroupTypesData => {
  const providersData = useAppSelector(selectProvidersData);
  const queriesData: IQueryData = useAppSelector(selectQueriesData);

  const walletsGroupTypes = [...AVAILABLE_WALLETS_GROUP_TYPES];

  const providersDataKeys = Object.keys(providersData).filter(
    providerName => providerName !== PERSIST_DEFAULT_KEY,
  );

  let connectedProvidersData: TConnectedProvidersData = null;
  let writeProviderData: TConnectData = null;

  for (let i = 0; i < providersDataKeys.length; i += 1) {
    const providerKey = providersDataKeys[i] as AvailableWriteProviders;
    const data = getConnectData(queriesData, providerKey);

    if (providerKey === writeProviderId) {
      writeProviderData = data;
    }

    if (data === null || !data.isConnected) {
      // eslint-disable-next-line no-continue
      continue;
    }

    connectedProvidersData =
      connectedProvidersData === null
        ? [data]
        : [...connectedProvidersData, data];

    walletsGroupTypes.splice(
      walletsGroupTypes.findIndex(groupType => groupType === providerKey),
      1,
    );
  }

  const isFullWalletsGroupTypes =
    AVAILABLE_WALLETS_GROUP_TYPES.length === walletsGroupTypes.length;

  return {
    connectedProvidersData,
    walletsGroupTypes:
      isFullWalletsGroupTypes || !walletsGroupTypes.length
        ? undefined
        : walletsGroupTypes,
    writeProviderData,
  };
};

import { QueryState } from '@redux-requests/core';

import { AvailableWriteProviders } from 'provider';

import { useAppSelector } from 'store/useAppSelector';

import { IConnect } from '../actions/connect';
import { AVAILABLE_WALLETS_GROUP_TYPES } from '../components/ConnectWalletsModal';
import { selectProvidersData, selectQueriesData } from '../store/authSlice';
import { getFullAuthRequestKey } from '../utils/getAuthRequestKey';

export type TConnectData = IConnect | null;

interface IUseWalletsGroupTypesProps {
  preProcessingFn?: (
    providerKey: AvailableWriteProviders,
    data: TConnectData,
  ) => void;
  postProcessingFn?: (
    providerKey: AvailableWriteProviders,
    data: IConnect,
  ) => void;
}

interface IUseWalletsGroupTypesData {
  walletsGroupTypes?: AvailableWriteProviders[];
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
  preProcessingFn,
  postProcessingFn,
}: IUseWalletsGroupTypesProps): IUseWalletsGroupTypesData => {
  const providersData = useAppSelector(selectProvidersData);
  const queriesData: IQueryData = useAppSelector(selectQueriesData);

  const walletsGroupTypes = [...AVAILABLE_WALLETS_GROUP_TYPES];

  const providersDataKeys = Object.keys(providersData).filter(
    providerName => providerName !== PERSIST_DEFAULT_KEY,
  );

  for (let i = 0; i < providersDataKeys.length; i += 1) {
    const providerKey = providersDataKeys[i] as AvailableWriteProviders;
    const data = getConnectData(queriesData, providerKey);

    if (typeof preProcessingFn === 'function') {
      preProcessingFn(providerKey, data);
    }

    if (data === null || !data.isConnected) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (typeof postProcessingFn === 'function') {
      postProcessingFn(providerKey, data);
    }

    walletsGroupTypes.splice(
      walletsGroupTypes.findIndex(groupType => groupType === providerKey),
      1,
    );
  }

  const isFullWalletsGroupTypes =
    AVAILABLE_WALLETS_GROUP_TYPES.length === walletsGroupTypes.length;

  return {
    walletsGroupTypes:
      isFullWalletsGroupTypes || !walletsGroupTypes.length
        ? undefined
        : walletsGroupTypes,
  };
};

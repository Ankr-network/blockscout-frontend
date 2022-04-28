import { useDispatchRequest } from '@redux-requests/react';

import { AvailableWriteProviders } from 'provider';

import { useAppSelector } from 'store/useAppSelector';

import { connect } from '../actions/connect';
import {
  selectEthProviderData,
  selectPolkadotProviderData,
} from '../store/authSlice';

import { useConnectedData } from './useConnectedData';
import { useProviderEffect } from './useProviderEffect';

export const useRestoreConnection = (): boolean => {
  const dispatchRequest = useDispatchRequest();

  const ethProviderStatus = useAppSelector(selectEthProviderData);
  const polkadotProviderStatus = useAppSelector(selectPolkadotProviderData);

  const {
    isConnected: isConnectedEth,
    isLoading: isLoadingEth,
    error: errorEth,
  } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const {
    isConnected: isConnectedPolkadot,
    isLoading: isLoadingPolkadot,
    error: errorPolkadot,
  } = useConnectedData(AvailableWriteProviders.polkadotCompatible);

  const isActiveAndNotConnectedEth =
    ethProviderStatus?.isActive && !isConnectedEth && !errorEth;
  const isActiveAndNotConnectedPolkadot =
    polkadotProviderStatus?.isActive && !isConnectedPolkadot && !errorPolkadot;
  const isActiveAndNotConnected =
    isActiveAndNotConnectedEth || isActiveAndNotConnectedPolkadot;

  const isShouldBeRestoredEth = isActiveAndNotConnectedEth && !isLoadingEth;
  const isShouldBeRestoredPolkadot =
    isActiveAndNotConnectedPolkadot && !isLoadingPolkadot;

  useProviderEffect(() => {
    if (isShouldBeRestoredEth) {
      dispatchRequest(
        connect(
          AvailableWriteProviders.ethCompatible,
          ethProviderStatus.walletId,
        ),
      );
    }

    if (isShouldBeRestoredPolkadot) {
      dispatchRequest(
        connect(
          AvailableWriteProviders.polkadotCompatible,
          polkadotProviderStatus.walletId,
          undefined,
          polkadotProviderStatus.address,
        ),
      );
    }
  }, [
    ethProviderStatus,
    polkadotProviderStatus,
    isShouldBeRestoredEth,
    isShouldBeRestoredPolkadot,
  ]);

  return isActiveAndNotConnected;
};

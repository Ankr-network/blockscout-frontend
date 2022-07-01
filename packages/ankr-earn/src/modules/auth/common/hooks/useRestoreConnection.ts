import { useDispatchRequest } from '@redux-requests/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t } from 'common';

import { showNotification } from 'modules/notifications';
import { useAppSelector } from 'store/useAppSelector';

import { connect } from '../actions/connect';
import {
  selectEthProviderData,
  selectPolkadotProviderData,
} from '../store/authSlice';

import { useConnectedData } from './useConnectedData';
import { useDisconnectAll } from './useDisconnectAll';
import { useProviderEffect } from './useProviderEffect';

const NOTIFIER_TIMEOUT = 10_000;

export const useRestoreConnection = (): boolean => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();
  const disconnectAll = useDisconnectAll();

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

  useEffect(() => {
    if (!isActiveAndNotConnected) return undefined;

    const timeoutId = setTimeout(() => {
      disconnectAll();
      dispatch(
        showNotification({
          message: t('error.metamask-fill-password'),
          variant: 'info',
        }),
      );
    }, NOTIFIER_TIMEOUT);

    return () => clearInterval(timeoutId);
  }, [disconnectAll, dispatch, isActiveAndNotConnected]);

  return isActiveAndNotConnected;
};

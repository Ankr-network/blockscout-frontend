import { useDispatchRequest } from '@redux-requests/react';

import { AvailableWriteProviders } from 'provider';

import { useAppSelector } from 'store/useAppSelector';

import { connect } from '../actions/connect';
import { selectEthProviderData } from '../store/authSlice';

import { useConnectedData } from './useConnectedData';
import { useProviderEffect } from './useProviderEffect';

export const useRestoreConnection = (): boolean => {
  const dispatchRequest = useDispatchRequest();
  const ethProviderStatus = useAppSelector(selectEthProviderData);
  const { isConnected, isLoading, error } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const activeAndNotConnected =
    ethProviderStatus?.isActive && !isConnected && !error;
  const shouldBeRestored = activeAndNotConnected && !isLoading;

  useProviderEffect(() => {
    if (shouldBeRestored) {
      dispatchRequest(
        connect(
          AvailableWriteProviders.ethCompatible,
          ethProviderStatus.walletId,
        ),
      );
    }
  }, [ethProviderStatus, shouldBeRestored]);

  return activeAndNotConnected;
};

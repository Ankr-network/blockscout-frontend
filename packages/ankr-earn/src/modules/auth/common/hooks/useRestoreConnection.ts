import { t } from '@ankr.com/common';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { ExtraWriteProviders } from 'modules/common/types';
import { showNotification } from 'modules/notifications';
import { useAppSelector } from 'store/useAppSelector';

import { useConnectMutation } from '../actions/connect';
import {
  selectEthProviderData,
  selectPolkadotProviderData,
} from '../store/authSlice';

import { useConnectedData } from './useConnectedData';
import { useDisconnectAll } from './useDisconnectAll';
import { useProviderEffect } from './useProviderEffect';

const NOTIFIER_TIMEOUT = 10_000;

export const useRestoreConnection = (): boolean => {
  const dispatch = useDispatch();
  const disconnectAll = useDisconnectAll();

  const ethProviderStatus = useAppSelector(selectEthProviderData);
  const polkadotProviderStatus = useAppSelector(selectPolkadotProviderData);

  const [connectEthCompatible] = useConnectMutation({
    fixedCacheKey: AvailableWriteProviders.ethCompatible,
  });
  const [connectPolkadot] = useConnectMutation({
    fixedCacheKey: ExtraWriteProviders.polkadotCompatible,
  });

  const {
    isConnected: isConnectedEth,
    isLoading: isLoadingEth,
    error: errorEth,
  } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const {
    isConnected: isConnectedPolkadot,
    isLoading: isLoadingPolkadot,
    error: errorPolkadot,
  } = useConnectedData(ExtraWriteProviders.polkadotCompatible);

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
      connectEthCompatible({
        providerId: AvailableWriteProviders.ethCompatible,
        wallet: ethProviderStatus.walletId,
      });
    }

    if (isShouldBeRestoredPolkadot) {
      connectPolkadot({
        providerId: ExtraWriteProviders.polkadotCompatible,
        wallet: polkadotProviderStatus.walletId,
        currentAccount: polkadotProviderStatus.address,
      });
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

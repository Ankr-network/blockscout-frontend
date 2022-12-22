import { t } from '@ankr.com/common';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectEthCompatibleMutation } from 'modules/auth/eth/actions/connectEthCompatible';
import { useConnectPolkadotMutation } from 'modules/auth/polkadot/actions/connectPolkadot';
import { ExtraWriteProviders } from 'modules/common/types';
import { showNotification } from 'modules/notifications';
import { useAppSelector } from 'store/useAppSelector';

import { useConnectSuiMutation } from '../../sui/actions/connectSui';
import {
  selectEthProviderData,
  selectPolkadotProviderData,
  selectSuiProviderData,
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
  const suiProviderStatus = useAppSelector(selectSuiProviderData);

  const [connectEthCompatible] = useConnectEthCompatibleMutation({
    fixedCacheKey: AvailableWriteProviders.ethCompatible,
  });

  const [connectPolkadot] = useConnectPolkadotMutation({
    fixedCacheKey: ExtraWriteProviders.polkadotCompatible,
  });

  const [connectSui] = useConnectSuiMutation({
    fixedCacheKey: ExtraWriteProviders.suiCompatible,
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

  const {
    isConnected: isConnectedSui,
    isLoading: isLoadingSui,
    error: errorSui,
  } = useConnectedData(ExtraWriteProviders.suiCompatible);

  const isActiveAndNotConnectedEth =
    ethProviderStatus?.isActive && !isConnectedEth && !errorEth;

  const isActiveAndNotConnectedPolkadot =
    polkadotProviderStatus?.isActive && !isConnectedPolkadot && !errorPolkadot;

  const isActiveAndNotConnectedSui =
    suiProviderStatus?.isActive && !isConnectedSui && !errorSui;

  const isActiveAndNotConnected =
    isActiveAndNotConnectedEth ||
    isActiveAndNotConnectedPolkadot ||
    isActiveAndNotConnectedSui;

  const isShouldBeRestoredEth = isActiveAndNotConnectedEth && !isLoadingEth;

  const isShouldBeRestoredPolkadot =
    isActiveAndNotConnectedPolkadot && !isLoadingPolkadot;

  const isShouldBeRestoredSui = isActiveAndNotConnectedSui && !isLoadingSui;

  useProviderEffect(() => {
    if (isShouldBeRestoredEth) {
      connectEthCompatible({ wallet: ethProviderStatus.walletId });
    }
  }, [connectEthCompatible, ethProviderStatus, isShouldBeRestoredEth]);

  useProviderEffect(() => {
    if (isShouldBeRestoredPolkadot) {
      connectPolkadot({
        currentAccount: polkadotProviderStatus.address,
      });
    }
  }, [connectPolkadot, isShouldBeRestoredPolkadot, polkadotProviderStatus]);

  useProviderEffect(() => {
    if (isShouldBeRestoredSui) {
      connectSui();
    }
  }, [connectSui, isShouldBeRestoredSui, suiProviderStatus]);

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

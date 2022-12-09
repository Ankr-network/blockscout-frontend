import { useCallback } from 'react';

import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';

import { useSwitchNetworkMutation } from 'modules/auth/common/actions/switchNetwork';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TChainId } from 'modules/auth/common/types';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { getIsInjectedWallet } from '../../utils/walletTypeUtils';

const providerId = AvailableWriteProviders.ethCompatible;

interface IUseGuardETHRouteArgs {
  isOpenConnectInstantly: boolean;
}

interface IUseGuardETHRoute {
  chainId?: TChainId;
  isConnected: boolean;
  isInjectedWallet: boolean;
  isSwitchNetworkLoading: boolean;
  walletId?: string;
  handleOpen: () => void;
  onNetworkSwitch: (newChainId: EEthereumNetworkId) => void;
}

export const useGuardETHRoute = ({
  isOpenConnectInstantly,
}: IUseGuardETHRouteArgs): IUseGuardETHRoute => {
  const { handleOpen } = useDialog(EKnownDialogs.connect);

  const { isConnected, chainId, walletName, walletId } =
    useConnectedData(providerId);

  const [switchNetwork, { isLoading: isSwitchNetworkLoading }] =
    useSwitchNetworkMutation();

  const isInjectedWallet = walletName ? getIsInjectedWallet(walletName) : false;

  const onNetworkSwitch = useCallback(
    (newChainId: EEthereumNetworkId) => {
      switchNetwork({ chainId: newChainId, providerId });
    },
    [switchNetwork],
  );

  useProviderEffect(() => {
    if (!isConnected && isOpenConnectInstantly) {
      handleOpen();
    }
  }, [isConnected, isOpenConnectInstantly, handleOpen]);

  return {
    chainId,
    isConnected,
    isInjectedWallet,
    isSwitchNetworkLoading,
    walletId,
    handleOpen,
    onNetworkSwitch,
  };
};

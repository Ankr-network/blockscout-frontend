import {
  AvailableWriteProviders,
  Web3KeyReadProvider,
} from '@ankr.com/provider-core';
import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';

import { t } from 'common';

import { connect } from 'modules/auth/common/actions/connect';
import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import {
  IUseGuardRouteData,
  IUseGuardRouteProps,
} from 'modules/auth/common/components/GuardRoute';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import {
  IETHNetwork,
  useETHNetworks,
} from 'modules/auth/eth/hooks/useETHNetworks';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { getIsInjectedWallet } from 'modules/auth/eth/utils/walletTypeUtils';
import { EEthereumNetworkId } from 'modules/common/types';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

import { useKnownNetworks } from './useKnownNetworks';

const providerId = AvailableWriteProviders.ethCompatible;

export const useGuardETHRoute = ({
  availableNetworks,
  isOpenedConnectModal = true,
}: IUseGuardRouteProps<EEthereumNetworkId>): IUseGuardRouteData<
  EEthereumNetworkId,
  IETHNetwork
> => {
  const dispatchRequest = useDispatchRequest();

  const { handleOpen: onOpenModal } = useDialog(EKnownDialogs.connect);

  const knownNetworks = useKnownNetworks();
  const networks = useETHNetworks();

  const { loading: isLoading } = useMutation({ type: switchNetwork });

  const { chainId, isConnected, walletName, walletId } =
    useConnectedData(providerId);

  const isInjected = Web3KeyReadProvider.isInjected();
  const isValidWallet = walletName ? getIsInjectedWallet(walletName) : false;

  const isUnsupportedNetwork =
    isConnected && isEVMCompatible(chainId) && chainId > 0
      ? !availableNetworks.includes(chainId)
      : false;

  const currentNetwork = useMemo(
    () =>
      isEVMCompatible(chainId) && knownNetworks[chainId]
        ? knownNetworks[chainId]
        : t('connect.current'),
    [chainId, knownNetworks],
  );

  const supportedNetworks = networks.filter(network =>
    availableNetworks.includes(network.chainId),
  );

  const onDispatchConnect = useCallback(
    () => dispatchRequest(connect(providerId, walletId)),
    [dispatchRequest, walletId],
  );

  const onSwitchNetwork = useCallback(
    (network: EEthereumNetworkId) => async () => {
      await dispatchRequest(switchNetwork({ providerId, chainId: network }));
    },
    [dispatchRequest],
  );

  useProviderEffect(() => {
    if (isOpenedConnectModal && isInjected && !isConnected) {
      onOpenModal();
    }
  }, [isConnected, isInjected, isOpenedConnectModal, onOpenModal]);

  return {
    currentNetwork,
    isConnected,
    isLoading,
    isUnsupportedNetwork,
    isValidWallet,
    supportedNetworks,
    onDispatchConnect,
    onOpenModal,
    onSwitchNetwork,
  };
};

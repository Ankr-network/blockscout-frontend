import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';

import { t } from 'common';

import { connect } from 'modules/auth/common/actions/connect';
import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import {
  IUseGuardRouteData,
  IUseGuardRouteProps,
} from 'modules/auth/common/components/GuardRoute';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useWalletsGroupTypes } from 'modules/auth/common/hooks/useWalletsGroupTypes';
import { useDialog } from 'modules/common/hooks/useDialog';
import { EEthereumNetworkId } from 'modules/common/types';

import { IETHNetwork, useETHNetworks } from '../../../hooks/useETHNetworks';
import { getIsMetaMask } from '../../../utils/getIsMetaMask';
import { isEVMCompatible } from '../../../utils/isEVMCompatible';

import { useKnownNetworks } from './useKnownNetworks';

export const useGuardETHRoute = ({
  availableNetworks,
  isOpenedConnectModal = true,
  providerId,
}: IUseGuardRouteProps<EEthereumNetworkId>): IUseGuardRouteData<
  EEthereumNetworkId,
  IETHNetwork
> => {
  const dispatchRequest = useDispatchRequest();

  const {
    isOpened: isOpenedModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDialog();

  const knownNetworks = useKnownNetworks();
  const networks = useETHNetworks();

  const { loading: isLoading } = useMutation({ type: switchNetwork });

  const { walletsGroupTypes, writeProviderData } = useWalletsGroupTypes({
    writeProviderId: providerId,
  });

  const chainId: EEthereumNetworkId | undefined = isEVMCompatible(
    writeProviderData?.chainId,
  )
    ? writeProviderData?.chainId
    : undefined;
  const isConnected = writeProviderData?.isConnected ?? false;
  const isValidWallet = writeProviderData?.walletName
    ? getIsMetaMask(writeProviderData.walletName)
    : false;
  const walletId = writeProviderData?.walletId;

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
    [dispatchRequest, providerId, walletId],
  );

  const onSwitchNetwork = useCallback(
    (network: EEthereumNetworkId) => async () => {
      await dispatchRequest(switchNetwork({ providerId, chainId: network }));
    },
    [dispatchRequest, providerId],
  );

  useProviderEffect(() => {
    if (isOpenedConnectModal && !isConnected) {
      onOpenModal();
    }
  }, [isConnected, isOpenedConnectModal, onOpenModal]);

  return {
    currentNetwork,
    isConnected,
    isLoading,
    isOpenedModal,
    isUnsupportedNetwork,
    isValidWallet,
    supportedNetworks,
    walletsGroupTypes,
    onCloseModal,
    onDispatchConnect,
    onOpenModal,
    onSwitchNetwork,
  };
};

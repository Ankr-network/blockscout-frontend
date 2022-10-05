import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useCallback } from 'react';

import {
  AvailableWriteProviders,
  EPolkadotNetworkId,
} from '@ankr.com/provider';
import { PolkadotProvider } from 'polkadot';

import { connect } from 'modules/auth/common/actions/connect';
import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import {
  IUseGuardRouteData,
  IUseGuardRouteProps,
} from 'modules/auth/common/components/GuardRoute';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useWalletsGroupTypes } from 'modules/auth/common/hooks/useWalletsGroupTypes';
import {
  IPolkadotNetwork,
  usePolkadotNetworks,
} from 'modules/auth/polkadot/hooks/usePolkadotNetworks';
import { getIsPolkadot } from 'modules/auth/polkadot/utils/getIsPolkadot';
import { isPolkadotCompatible } from 'modules/auth/polkadot/utils/isPolkadotCompatible';
import { useDialog } from 'modules/common/hooks/useDialog';

export const useGuardPolkadotRoute = ({
  availableNetworks,
  isOpenedConnectModal = true,
  providerId,
}: IUseGuardRouteProps<EPolkadotNetworkId>): IUseGuardRouteData<
  EPolkadotNetworkId,
  IPolkadotNetwork
> => {
  const dispatchRequest = useDispatchRequest();

  const {
    isOpened: isOpenedModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDialog();

  const networks = usePolkadotNetworks();

  const { loading: isLoading } = useMutation({ type: switchNetwork });

  const { walletsGroupTypes, writeProviderData } = useWalletsGroupTypes({
    writeProviderId: providerId,
  });

  const chainId: EPolkadotNetworkId | undefined = isPolkadotCompatible(
    writeProviderData?.chainId,
  )
    ? (writeProviderData?.chainId as EPolkadotNetworkId)
    : undefined;
  const isConnected = writeProviderData?.isConnected ?? false;
  const isInjected = PolkadotProvider.isInjected();
  const isValidWallet = writeProviderData?.walletName
    ? getIsPolkadot(writeProviderData.walletName)
    : false;
  const walletId = writeProviderData?.walletId;

  const isUnsupportedNetwork =
    isConnected && isPolkadotCompatible(chainId)
      ? !availableNetworks.includes(chainId)
      : false;

  const supportedNetworks = networks.filter(network =>
    availableNetworks.includes(network.chainId),
  );

  const onDispatchConnect = useCallback(
    () => dispatchRequest(connect(providerId, walletId)),
    [dispatchRequest, providerId, walletId],
  );

  const onSwitchNetwork = useCallback(
    (network: EPolkadotNetworkId) => async (): Promise<void> => {
      await dispatchRequest(switchNetwork({ providerId, chainId: network }));
    },
    [dispatchRequest, providerId],
  );

  useProviderEffect(
    () => {
      if (isOpenedConnectModal && isInjected && !isConnected) {
        onOpenModal();
      }
    },
    [isConnected, isInjected, isOpenedConnectModal, onOpenModal],
    AvailableWriteProviders.polkadotCompatible,
  );

  return {
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

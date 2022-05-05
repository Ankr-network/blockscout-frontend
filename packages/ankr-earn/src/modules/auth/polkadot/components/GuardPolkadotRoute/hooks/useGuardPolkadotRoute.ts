import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';

import { t } from 'common';
import { EPolkadotNetworkId } from 'provider';

import { connect } from 'modules/auth/common/actions/connect';
import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import {
  IUseGuardRouteData,
  IUseGuardRouteProps,
} from 'modules/auth/common/components/GuardRoute';
import { useWalletsGroupTypes } from 'modules/auth/common/hooks/useWalletsGroupTypes';
import { useDialog } from 'modules/common/hooks/useDialog';

import {
  IPolkadotNetwork,
  usePolkadotNetworks,
} from '../../../hooks/usePolkadotNetworks';
import { getIsPolkadot } from '../../../utils/getIsPolkadot';

import { useKnownNetworks } from './useKnownNetworks';

export const useGuardPolkadotRoute = ({
  availableNetworks,
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

  const knownNetworks = useKnownNetworks();
  const networks = usePolkadotNetworks();

  const { loading: isLoading } = useMutation({ type: switchNetwork });

  const { walletsGroupTypes, writeProviderData } = useWalletsGroupTypes({
    writeProviderId: providerId,
  });

  const chainId: EPolkadotNetworkId | undefined =
    (writeProviderData?.chainType as EPolkadotNetworkId) ?? undefined;
  const isConnected = writeProviderData?.isConnected ?? false;
  const isValidWallet = writeProviderData?.walletName
    ? getIsPolkadot(writeProviderData.walletName)
    : false;
  const walletId = writeProviderData?.walletId;

  const isUnsupportedNetwork =
    isConnected && typeof chainId === 'string'
      ? !availableNetworks.includes(chainId)
      : false;

  const currentNetwork = useMemo(
    () =>
      typeof chainId === 'string' && knownNetworks[chainId]
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
    (network: EPolkadotNetworkId) => (): void => {
      dispatchRequest(switchNetwork({ providerId, chainId: network }));
    },
    [dispatchRequest, providerId],
  );

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

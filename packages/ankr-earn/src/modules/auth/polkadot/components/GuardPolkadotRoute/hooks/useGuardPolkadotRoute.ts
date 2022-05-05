import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useCallback } from 'react';

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
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import {
  IPolkadotNetwork,
  usePolkadotNetworks,
} from '../../../hooks/usePolkadotNetworks';
import { getIsPolkadot } from '../../../utils/getIsPolkadot';

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

  const infoTxt = useLocaleMemo(
    () => t('connect.unsupported-polkadot-network'),
    [],
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
    infoTxt,
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

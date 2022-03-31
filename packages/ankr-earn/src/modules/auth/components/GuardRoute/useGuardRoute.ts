import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { AvailableWriteProviders } from 'provider';

import { useDialog } from 'modules/common/hooks/useDialog';
import { BlockchainNetworkId } from 'modules/common/types';
import { TActionPromise } from 'modules/common/types/ReduxRequests';

import { connect, IConnect } from '../../actions/connect';
import { switchNetwork } from '../../actions/switchNetwork';
import { useWalletsGroupTypes } from '../../hooks/useWalletsGroupTypes';
import { getIsMetaMask } from '../../utils/getIsMetaMask';
import { getIsPolkadot } from '../../utils/getIsPolkadot';

import { INetwork, useNetworks } from './useNetworks';

interface IUseGuardRouteArgs {
  availableNetworks: BlockchainNetworkId[];
  providerId: AvailableWriteProviders;
}

interface IUseGuardRouteData {
  isConnected: boolean;
  isOpenedModal: boolean;
  isUnsupportedNetwork: boolean;
  supportedNetworks: INetwork[];
  chainId?: BlockchainNetworkId;
  isValidWallet: boolean;
  dispatchConnect: () => TActionPromise<IConnect>;
  handleSwitchNetwork: (network: BlockchainNetworkId) => () => void;
  walletsGroupTypes?: AvailableWriteProviders[];
  onCloseModal: () => void;
  onOpenModal: () => void;
}

export const useGuardRoute = ({
  availableNetworks,
  providerId,
}: IUseGuardRouteArgs): IUseGuardRouteData => {
  const {
    isOpened: isOpenedModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDialog();
  const networks = useNetworks();
  const dispatchRequest = useDispatchRequest();

  let isConnected = false;
  let isMetaMask = false;
  let isPolkadot = false;
  let chainId: number | undefined;
  let chainType: string | null = null;
  let walletId: string | undefined;

  let isUnsupportedNetwork = false;

  const { walletsGroupTypes } = useWalletsGroupTypes({
    postProcessingFn: (providerKey, data): void => {
      if (providerKey !== providerId) {
        return;
      }

      isConnected = data.isConnected;
      isMetaMask = getIsMetaMask(data.walletName);
      isPolkadot = getIsPolkadot(data.walletName);
      chainId = data.chainId;
      chainType = data.chainType;
      walletId = data.walletId;
    },
  });

  if (isConnected) {
    if (typeof chainId === 'number' && chainId !== 0) {
      isUnsupportedNetwork = !availableNetworks.includes(chainId);
    } else if (chainType !== null) {
      isUnsupportedNetwork = !availableNetworks.includes(chainType);
    }
  }

  const supportedNetworks = networks.filter(network =>
    availableNetworks.includes(network.chainId),
  );

  const handleSwitchNetwork = useCallback(
    (network: BlockchainNetworkId) => () => {
      dispatchRequest(switchNetwork({ providerId, chainId: network }));
    },
    [dispatchRequest, providerId],
  );

  const dispatchConnect = useCallback(
    () => dispatchRequest(connect(providerId, walletId)),
    [dispatchRequest, providerId, walletId],
  );

  return {
    isConnected,
    isOpenedModal,
    isUnsupportedNetwork,
    supportedNetworks,
    chainId,
    isValidWallet: isMetaMask || isPolkadot,
    dispatchConnect,
    handleSwitchNetwork,
    walletsGroupTypes,
    onCloseModal,
    onOpenModal,
  };
};

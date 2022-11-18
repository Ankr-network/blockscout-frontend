import { useDispatchRequest, useMutation } from '@redux-requests/react';
import { useCallback } from 'react';

import { EPolkadotNetworkId, PolkadotProvider } from 'polkadot';

import { connect } from 'modules/auth/common/actions/connect';
import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import {
  IUseGuardRouteData,
  IUseGuardRouteProps,
} from 'modules/auth/common/components/GuardRoute';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import {
  IPolkadotNetwork,
  usePolkadotNetworks,
} from 'modules/auth/polkadot/hooks/usePolkadotNetworks';
import { getIsPolkadot } from 'modules/auth/polkadot/utils/getIsPolkadot';
import { isPolkadotCompatible } from 'modules/auth/polkadot/utils/isPolkadotCompatible';
import { ExtraWriteProviders } from 'modules/common/types';
import { sleep } from 'modules/common/utils/sleep';
import { EKnownDialogs, useDialog } from 'modules/dialogs';

const providerId = ExtraWriteProviders.polkadotCompatible;

export const useGuardPolkadotRoute = ({
  availableNetworks,
  isOpenedConnectModal = true,
}: IUseGuardRouteProps<EPolkadotNetworkId>): IUseGuardRouteData<
  EPolkadotNetworkId,
  IPolkadotNetwork
> => {
  const dispatchRequest = useDispatchRequest();

  const { handleOpen: onOpenModal } = useDialog(EKnownDialogs.connect);

  const networks = usePolkadotNetworks();

  const { loading: isLoading } = useMutation({ type: switchNetwork });

  const {
    chainId: chain,
    isConnected,
    walletName,
    walletId,
  } = useConnectedData(providerId);

  const chainId: EPolkadotNetworkId | undefined = isPolkadotCompatible(chain)
    ? (chain as EPolkadotNetworkId)
    : undefined;
  const isInjected = PolkadotProvider.isInjected();
  const isValidWallet = walletName ? getIsPolkadot(walletName) : false;

  const isUnsupportedNetwork =
    isConnected && isPolkadotCompatible(chainId)
      ? !availableNetworks.includes(chainId)
      : false;

  const supportedNetworks = networks.filter(network =>
    availableNetworks.includes(network.chainId),
  );

  const onDispatchConnect = useCallback(
    () => dispatchRequest(connect(providerId, walletId)),
    [dispatchRequest, walletId],
  );

  const onSwitchNetwork = useCallback(
    (network: EPolkadotNetworkId) => async (): Promise<void> => {
      await dispatchRequest(
        switchNetwork({
          providerId,
          chainId: network,
        }),
      );
    },
    [dispatchRequest],
  );

  useProviderEffect(
    () => {
      (async () => {
        if (isOpenedConnectModal && isInjected && !isConnected) {
          // todo: should be removed after removal of double guard for polkadot
          await sleep(10);
          onOpenModal();
        }
      })();
    },
    [isConnected, isInjected, isOpenedConnectModal, onOpenModal],
    ExtraWriteProviders.polkadotCompatible,
  );

  return {
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

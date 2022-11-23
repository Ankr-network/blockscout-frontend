import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';

import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { BNB_STAKING_NETWORKS } from 'modules/stake-bnb/const';

const providerId = AvailableWriteProviders.ethCompatible;

interface IUseSupportedNetwork {
  isUnsupportedNetwork: boolean;
  onSwitchNetwork: (network: EEthereumNetworkId) => Promise<unknown>;
}

export const useSupportedNetwork = (): IUseSupportedNetwork => {
  const dispatchRequest = useDispatchRequest();
  const { isConnected, chainId } = useConnectedData(providerId);

  const isUnsupportedNetwork =
    isConnected && isEVMCompatible(chainId) && chainId > 0
      ? !BNB_STAKING_NETWORKS.includes(chainId)
      : false;

  const onSwitchNetwork = useCallback(
    (network: EEthereumNetworkId) =>
      dispatchRequest(switchNetwork({ providerId, chainId: network })),
    [dispatchRequest],
  );

  return {
    isUnsupportedNetwork,
    onSwitchNetwork,
  };
};

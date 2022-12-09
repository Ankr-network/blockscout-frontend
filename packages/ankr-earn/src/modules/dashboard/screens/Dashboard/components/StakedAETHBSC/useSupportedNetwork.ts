import { useCallback } from 'react';

import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';

import { useSwitchNetworkMutation } from 'modules/auth/common/actions/switchNetwork';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { BNB_STAKING_NETWORKS } from 'modules/stake-bnb/const';

const providerId = AvailableWriteProviders.ethCompatible;

interface IUseSupportedNetwork {
  isUnsupportedNetwork: boolean;
  onSwitchNetwork: (network: EEthereumNetworkId) => Promise<unknown>;
}

export const useSupportedNetwork = (): IUseSupportedNetwork => {
  const { isConnected, chainId } = useConnectedData(providerId);

  const [switchNetwork] = useSwitchNetworkMutation();

  const isUnsupportedNetwork =
    isConnected && isEVMCompatible(chainId) && chainId > 0
      ? !BNB_STAKING_NETWORKS.includes(chainId)
      : false;

  const onSwitchNetwork = useCallback(
    (network: EEthereumNetworkId) =>
      switchNetwork({ providerId, chainId: network }),
    [switchNetwork],
  );

  return {
    isUnsupportedNetwork,
    onSwitchNetwork,
  };
};

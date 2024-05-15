import { EBlockchain, ethNetworkIdByBlockchainMap } from 'multirpc-sdk';
import { useMemo } from 'react';
import { EEthereumNetworkId } from '@ankr.com/provider';

import { useSwitchNetworkMutation } from 'modules/common/actions/switchNetwork';
import { isMainnet } from 'modules/common/constants/const';

export const useNetworkGuard = (selectedNetwork: EBlockchain) => {
  const [handleSwitchNetwork, { isLoading: isSwitchNetworkLoading }] =
    useSwitchNetworkMutation();

  const selectedNetworkId = ethNetworkIdByBlockchainMap[selectedNetwork];

  // in this version only ethereum network is supported
  // TODO: use const { networkId } = useWalletNetworkId(); for checking conditions in the next version
  const isWrongNetwork = useMemo(() => {
    // TODO: use this condition in the next version
    // if (!networkId) {
    //   setProviderNetworkId(dispatch);
    // }

    if (isMainnet) {
      return selectedNetworkId !== EEthereumNetworkId.mainnet;
    }

    return selectedNetworkId !== EEthereumNetworkId.holesky;
  }, [selectedNetworkId]);

  return {
    isWrongNetwork,
    handleSwitchNetwork,
    isSwitchNetworkLoading,
  };
};

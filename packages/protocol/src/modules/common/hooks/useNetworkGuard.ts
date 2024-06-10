import { EBlockchain, ethNetworkIdByBlockchainMap } from 'multirpc-sdk';

import { useSwitchNetworkMutation } from 'modules/common/actions/switchNetwork';
import { useWalletNetworkId } from 'domains/wallet/hooks/useWalletNetworkId';

export const useNetworkGuard = (selectedNetwork: EBlockchain) => {
  const [handleSwitchNetwork, { isLoading: isSwitchNetworkLoading }] =
    useSwitchNetworkMutation();

  const selectedNetworkId = ethNetworkIdByBlockchainMap[selectedNetwork];

  const { networkId } = useWalletNetworkId();

  const isWrongNetwork = !networkId || selectedNetworkId !== networkId;

  return { handleSwitchNetwork, isSwitchNetworkLoading, isWrongNetwork };
};

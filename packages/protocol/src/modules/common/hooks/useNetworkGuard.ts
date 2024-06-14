import { EBlockchain, ethNetworkIdByBlockchainMap } from 'multirpc-sdk';

import { useSwitchNetworkMutation } from 'modules/common/actions/switchNetwork';
import { useWalletNetworkId } from 'domains/wallet/hooks/useWalletNetworkId';

export type THandleNetworkSwitch = ReturnType<
  typeof useNetworkGuard
>['handleNetworkSwitch'];

export const useNetworkGuard = (selectedNetwork: EBlockchain) => {
  const [handleNetworkSwitch, { isLoading: isNetworkSwitching }] =
    useSwitchNetworkMutation();

  const selectedNetworkId = ethNetworkIdByBlockchainMap[selectedNetwork];

  const { networkId } = useWalletNetworkId();

  const isNetworkWrong = Boolean(networkId) && selectedNetworkId !== networkId;

  return { handleNetworkSwitch, isNetworkSwitching, isNetworkWrong };
};

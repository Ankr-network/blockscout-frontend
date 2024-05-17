import { EBlockchain, ethNetworkIdByBlockchainMap } from 'multirpc-sdk';
import { useMemo } from 'react';

import { useSwitchNetworkMutation } from 'modules/common/actions/switchNetwork';
import { useWalletNetworkId } from 'domains/wallet/hooks/useWalletNetworkId';
import { setProviderNetworkId } from 'domains/wallet/utils/setProviderNetworkId';
import { useAppDispatch } from 'store/useAppDispatch';
import { ECurrency } from 'modules/billing/types';

export const useNetworkGuard = (
  selectedNetwork: EBlockchain,
  currency: ECurrency,
) => {
  const dispatch = useAppDispatch();
  const [handleSwitchNetwork, { isLoading: isSwitchNetworkLoading }] =
    useSwitchNetworkMutation();

  const selectedNetworkId = ethNetworkIdByBlockchainMap[selectedNetwork];

  // in this version only ethereum network is supported
  const { networkId } = useWalletNetworkId();

  const isWrongNetwork = useMemo(() => {
    if (!networkId) {
      setProviderNetworkId(dispatch);
    }

    return selectedNetworkId !== networkId;
  }, [currency, networkId, selectedNetworkId]);

  return {
    isWrongNetwork,
    handleSwitchNetwork,
    isSwitchNetworkLoading,
  };
};

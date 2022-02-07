import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import {
  AvailableProviders,
  BlockchainNetworkId,
} from 'provider/providerManager/types';
import { DependencyList, EffectCallback, useEffect, useMemo } from 'react';

const BNB_NETWORKS: BlockchainNetworkId[] = [
  BlockchainNetworkId.smartchain,
  BlockchainNetworkId.smartchainTestnet,
];

export const useBNBNetworkEffect = (
  effect: EffectCallback,
  deps: DependencyList,
): void => {
  const { chainId, address } = useConnectedData(
    AvailableProviders.ethCompatible,
  );

  const isBNBNetwork: boolean = useMemo(
    () =>
      typeof chainId === 'number' ? BNB_NETWORKS.includes(chainId) : false,
    [chainId],
  );

  useEffect((): void => {
    if (!isBNBNetwork) {
      return;
    }

    effect();
  }, [
    address,
    chainId,
    effect,
    isBNBNetwork,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ]);
};

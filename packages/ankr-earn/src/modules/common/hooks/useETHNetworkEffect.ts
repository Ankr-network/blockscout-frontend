import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import {
  AvailableProviders,
  BlockchainNetworkId,
} from 'provider/providerManager/types';
import { DependencyList, EffectCallback, useEffect, useMemo } from 'react';

const ETH_NETWORKS: BlockchainNetworkId[] = [
  BlockchainNetworkId.mainnet,
  BlockchainNetworkId.goerli,
];

export const useETHNetworkEffect = (
  effect: EffectCallback,
  deps: DependencyList,
): void => {
  const { chainId, address } = useConnectedData(
    AvailableProviders.ethCompatible,
  );

  const isETHNetwork: boolean = useMemo(
    () =>
      typeof chainId === 'number' ? ETH_NETWORKS.includes(chainId) : false,
    [chainId],
  );

  useEffect((): void => {
    if (!isETHNetwork) {
      return;
    }

    effect();
  }, [
    address,
    chainId,
    effect,
    isETHNetwork,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ]);
};

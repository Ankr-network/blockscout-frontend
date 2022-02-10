import { AvailableWriteProviders } from 'provider/providerManager/types';
import { DependencyList, EffectCallback, useEffect } from 'react';
import { useConnectedData } from './useConnectedData';

export const useProviderEffect = (
  effect: EffectCallback,
  deps: DependencyList = [],
  provider = AvailableWriteProviders.ethCompatible,
) => {
  const { chainId, address } = useConnectedData(provider);
  // eslint-disable-next-line
  return useEffect(effect, [...deps, chainId, address]);
};

import { DependencyList, EffectCallback, useEffect } from 'react';

import { AvailableWriteProviders } from 'provider';

import { useConnectedData } from './useConnectedData';

export const useProviderEffect = (
  effect: EffectCallback,
  deps: DependencyList = [],
  provider = AvailableWriteProviders.ethCompatible,
): void => {
  const { chainId, address } = useConnectedData(provider);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(effect, [...deps, chainId, address]);
};

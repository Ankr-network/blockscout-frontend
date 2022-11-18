import { DependencyList, EffectCallback, useEffect } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { AvailableStakingWriteProviders } from '../../../common/types';

import { useConnectedData } from './useConnectedData';

export const useProviderEffect = (
  effect: EffectCallback,
  deps: DependencyList = [],
  provider: AvailableStakingWriteProviders = AvailableWriteProviders.ethCompatible,
): void => {
  const { chainId, address } = useConnectedData(provider);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(effect, [...deps, chainId, address]);
};

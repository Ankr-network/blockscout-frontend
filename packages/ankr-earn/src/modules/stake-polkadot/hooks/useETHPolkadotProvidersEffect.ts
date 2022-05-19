import { DependencyList, EffectCallback, useEffect } from 'react';

import { AvailableWriteProviders } from 'provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';

export const useETHPolkadotProvidersEffect = (
  effect: EffectCallback,
  deps: DependencyList = [],
): void => {
  const { address: ethAddress, chainId: ethChainID } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );
  const { address: polkadotAddress } = useConnectedData(
    AvailableWriteProviders.polkadotCompatible,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [...deps, ethAddress, ethChainID, polkadotAddress]);
};

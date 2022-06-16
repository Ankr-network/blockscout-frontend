import { DependencyList, EffectCallback, useEffect } from 'react';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';

import { ETH_WRITE_PROVIDER_ID, POLKADOT_WRITE_PROVIDER_ID } from '../const';

export const useETHPolkadotProvidersEffect = (
  effect: EffectCallback,
  deps: DependencyList = [],
): void => {
  const { address: ethAddress, chainId: ethChainId } = useConnectedData(
    ETH_WRITE_PROVIDER_ID,
  );
  const { address: polkadotAddress } = useConnectedData(
    POLKADOT_WRITE_PROVIDER_ID,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [...deps, ethAddress, ethChainId, polkadotAddress]);
};

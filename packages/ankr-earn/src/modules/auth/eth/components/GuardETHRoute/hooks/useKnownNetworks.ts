import { t } from '@ankr.com/common';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

type TUseKnownNetworksData = Record<number, string>;

export const useKnownNetworks = (): TUseKnownNetworksData =>
  useLocaleMemo(() => {
    const networkIdKeys = Object.keys(EEthereumNetworkId);

    return networkIdKeys.reduce<TUseKnownNetworksData>((acc, chainKey) => {
      const chainId = +chainKey;

      if (Number.isNaN(chainId)) {
        return acc;
      }

      const chainName = t(`chain.${chainId}`);
      const isValidChainName = !chainName.includes('chain.');

      if (isValidChainName) {
        acc[chainId] = chainName;
      }

      return acc;
    }, {});
  }, []);

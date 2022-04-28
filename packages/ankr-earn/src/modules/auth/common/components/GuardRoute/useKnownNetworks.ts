import { BlockchainNetworkId } from 'provider';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';

export const useKnownNetworks = (): Record<number, string> =>
  useLocaleMemo(() => {
    const networkIdKeys = Object.keys(BlockchainNetworkId);
    const knownNetworksMap = networkIdKeys.reduce<Record<number, string>>(
      (acc, key) => {
        const chainKey = +key;
        if (Number.isNaN(chainKey)) {
          return acc;
        }

        const chainName = t(`chain.${chainKey}`);
        const chainNameSpecified = !chainName.includes('chain.');

        if (chainNameSpecified) {
          acc[chainKey] = chainName;
        }

        return acc;
      },
      {},
    );

    return knownNetworksMap;
  }, []);

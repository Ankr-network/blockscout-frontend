import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';

const knownNetworks = [1, 3, 4, 5, 6, 56, 61, 63, 97, 43113, 43114, 2018];

export const useKnownNetworks = (): Record<number, string> =>
  useLocaleMemo(() => {
    const knownNetworksMap: Record<number, string> = {};
    for (const networkId of knownNetworks) {
      knownNetworksMap[networkId] = t(`chain.${networkId}`);
    }
    return knownNetworksMap;
  }, []);

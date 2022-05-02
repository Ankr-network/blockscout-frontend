import { t } from 'common';
import { EPolkadotNetworkId } from 'provider';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

type TUseKnownNetworksData = Record<string, string>;

export const useKnownNetworks = (): TUseKnownNetworksData =>
  useLocaleMemo(() => {
    const networkIdValues = Object.values(EPolkadotNetworkId);

    return networkIdValues.reduce<TUseKnownNetworksData>(
      (acc, networkValue) => {
        const networkName = t(`stake-polkadot.networks.${networkValue}`);
        const isValidNetworkName = !networkName.includes(
          'stake-polkadot.networks.',
        );

        if (isValidNetworkName) {
          acc[networkValue] = networkName;
        }

        return acc;
      },
      {},
    );
  }, []);

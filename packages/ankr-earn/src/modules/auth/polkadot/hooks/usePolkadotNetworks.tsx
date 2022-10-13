import { EPolkadotNetworkId, t } from 'common';

import { INetworkItem } from 'modules/auth/common/components/GuardRoute';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { DotIcon } from 'uiKit/Icons/DotIcon';
import { KsmIcon } from 'uiKit/Icons/KsmIcon';

export interface IPolkadotNetwork extends INetworkItem<EPolkadotNetworkId> {}

export const usePolkadotNetworks = (): IPolkadotNetwork[] =>
  useLocaleMemo(
    () => [
      {
        chainId: EPolkadotNetworkId.kusama,
        icon: <KsmIcon />,
        title: t('connect.networks.kusama'),
      },
      {
        chainId: EPolkadotNetworkId.polkadot,
        icon: <DotIcon />,
        title: t('connect.networks.polkadot'),
      },
      {
        chainId: EPolkadotNetworkId.rococo,
        icon: <DotIcon />,
        title: t('connect.networks.rococo'),
      },
      {
        chainId: EPolkadotNetworkId.westend,
        icon: <DotIcon />,
        title: t('connect.networks.westend'),
      },
    ],
    [],
  );

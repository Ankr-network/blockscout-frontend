import { INodesDetailEntity, INodeDetailEntity } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { Check, Cross } from '@ankr.com/ui';

import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { VirtualTableColumn } from 'uiKit/VirtualTable';
import { ProviderRow } from './LocationsTableProps';
import { useLocationsTableStyles } from './useLocationsTableStyles';

type Continents = Record<string, boolean>;

export const getRows = (nodesDetail: INodesDetailEntity[]): ProviderRow[] => {
  if (!Array.isArray(nodesDetail) || nodesDetail.length === 0) return [];

  const nodes = nodesDetail[0]?.nodes;

  const formattedNodes = nodes.map((item: INodeDetailEntity) => {
    const { location, isPremium } = item;
    const { continent } = location;

    return {
      continent,
      isPremium,
    };
  });

  const continents = formattedNodes.reduce((acc: Continents, value) => {
    const { continent, isPremium } = value;

    if (!(continent in acc)) {
      acc[continent] = false;
    }

    if (isPremium) {
      acc[continent] = isPremium;
    }

    return acc;
  }, {});

  return Object.entries(continents).map(continent => {
    const [continentName, isPremium] = continent;

    return {
      continent: continentName,
      isPremium,
    };
  });
};

const getIcon = (
  activeClassName: string,
  iconClassName: string,
  hasIcon?: boolean,
) => {
  return hasIcon ? (
    <Check className={activeClassName} />
  ) : (
    <Cross className={iconClassName} />
  );
};

export const useColumns = () => {
  const { classes } = useLocationsTableStyles();

  return useLocaleMemo(
    () =>
      [
        {
          width: '50%',
          field: 'location',
          headerName: t('chain-item.nodes-table.head.location'),
          render: ({ continent }) => t(`continents.${continent}`),
        },
        {
          width: '25%',
          field: 'isFree',
          headerName: t('chain-item.locations.head.free'),
          render: ({ isPremium }) =>
            getIcon(classes.activeIcon, classes.icon, !isPremium),
          align: 'center',
        },
        {
          width: '25%',
          field: 'isPremium',
          headerName: t('chain-item.locations.head.premium'),
          render: () => getIcon(classes.activeIcon, classes.icon, true),
          align: 'center',
        },
      ] as VirtualTableColumn<ProviderRow>[],
    [classes.activeIcon, classes.icon],
  );
};

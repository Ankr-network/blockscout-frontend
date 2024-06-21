import { Box, capitalize, Typography, useTheme } from '@mui/material';
import BigNumber from 'bignumber.js';
import { INodesDetailEntity, INodeDetailEntity } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import ReactCountryFlag from 'react-country-flag';

import { getStatusByNodeScore } from 'modules/common/utils/node';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { StatusCircle, StatusCircleStatus } from 'uiKit/StatusCircle';
import { VirtualTableColumn } from 'uiKit/VirtualTable';
import { getStatusColor } from 'uiKit/utils/styleUtils';

import { useStyles } from './useStyles';
import { ProviderRow } from './ChainNodesTableProps';

export const CHAIN_NODES_TABLE_PAGE_SIZE = 10;

export const getRows = (
  nodesDetail: INodesDetailEntity[],
  showNodesWithZeroHeight: boolean,
): ProviderRow[] => {
  if (!Array.isArray(nodesDetail) || nodesDetail.length === 0) return [];

  const node = nodesDetail[0];
  const { id, name } = node;

  const nodes = node?.nodes.map((item: INodeDetailEntity) => {
    const { height, location, scheme, score, weight } = item;

    return {
      id,
      nodeId: id,
      blockchain: name,
      scheme,
      chainName: name ? capitalize(name) : '',
      continent: location.continent,
      country: location.country,
      organization: item.name.split('_')[0],
      height,
      weight,
      score,
    };
  });

  const totalWeights = nodes.reduce((acc, el) => acc + el.weight, 0);

  return Object.values(nodes)
    .map(item => {
      const percentWeight = (100 * item.weight) / totalWeights || 0;

      return {
        ...item,
        weight: new BigNumber(percentWeight),
      };
    })
    .filter(({ height }) => showNodesWithZeroHeight || height > 0)
    .sort((a, b) => {
      const firstLevel = b.height - a.height;
      const secondLevel = b.weight.toNumber() - a.weight.toNumber();
      const thirdLevel = (a.organization || '').localeCompare(
        b.organization || '',
      );

      return firstLevel || secondLevel || thirdLevel;
    });
};

function isHeightColVisibleStatus(status: StatusCircleStatus): boolean {
  const visibleStatuses = ['warning', 'error'];

  return visibleStatuses.includes(status);
}

export const useChainNodesTableTableColumns = () => {
  const theme = useTheme();
  const { classes } = useStyles();

  return useLocaleMemo(
    () =>
      [
        {
          width: '40%',
          field: 'node',
          headerName: t('chain-item.nodes-table.head.node'),
          render: ({ organization, score }) => {
            const nodeStatus = getStatusByNodeScore(score);

            return (
              <Box display="flex" alignItems="center">
                <StatusCircle mr={1.25} status={nodeStatus} />
                {capitalize(organization || '')}
              </Box>
            );
          },
        },
        {
          field: 'height',
          headerName: t('chain-item.nodes-table.head.height'),
          render: ({ height, score }) => {
            const nodeStatus = getStatusByNodeScore(score);

            return (
              <Typography
                style={{
                  color:
                    isHeightColVisibleStatus(nodeStatus) && height
                      ? getStatusColor(theme, nodeStatus)
                      : 'inherit',
                }}
                variant="inherit"
              >
                {height || '-'}
              </Typography>
            );
          },
        },
        {
          width: '30%',
          field: 'location',
          headerName: t('chain-item.nodes-table.head.location'),
          render: ({ continent, country }) => {
            return (
              country && (
                <>
                  <ReactCountryFlag
                    svg
                    className={classes.flag}
                    countryCode={country}
                  />
                  &nbsp; &nbsp; {t(`continents.${continent}`)}
                </>
              )
            );
          },
        },
        {
          field: 'weight',
          headerName: t('chain-item.nodes-table.head.weight'),
          render: ({ weight }) => `${weight?.toFixed(0)}%`,
          align: 'right',
        },
      ] as VirtualTableColumn<ProviderRow>[],
    [],
  );
};

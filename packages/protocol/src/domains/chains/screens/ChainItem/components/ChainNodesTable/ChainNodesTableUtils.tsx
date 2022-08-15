import { Box, capitalize, Typography, useTheme } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { INodeEntity, IWorkerNodesWeight } from 'multirpc-sdk';
import { StatusCircle, StatusCircleStatus } from 'uiKit/StatusCircle';
import { useStyles } from './useStyles';

import { t } from 'common';
import { getStatusByNodeScore } from 'modules/common/utils/node';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import ReactCountryFlag from 'react-country-flag';
import { VirtualTableColumn } from 'ui';
import { getStatusColor } from 'uiKit/utils/styleUtils';
import { GroupedNode, ProviderRow } from './ChainNodesTableProps';

export const CHAIN_NODES_TABLE_PAGE_SIZE = 10;

export const getRows = (
  data: INodeEntity[],
  nodesWeight: IWorkerNodesWeight[],
): ProviderRow[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  // there is no null in types but just to be sure.. but default value for fn parameter will be pretty
  if (!Array.isArray(nodesWeight)) {
    nodesWeight = [];
  }

  const groupedNodes = data.reduce<Record<string, GroupedNode>>(
    (result: any, node: INodeEntity | any) => {
      if (!result[node.id]) {
        result[node.id] = {
          id: node.id,
          nodeId: node.id,
          blockchain: node.blockchain,
          scheme: node.scheme,
          continent: node.continent,
          country: node.country,
          city: node.city,
          totalNodes: 0,
          archiveNodes: 0,
          icon: node.icon,
          organization: node.organization,
          chainName: node.blockchain ? capitalize(node.blockchain) : '',
        };
        result[node.id].totalNodes++;
      }

      if (node.isArchive) {
        result[node.id].archiveNodes++;
      }

      return result;
    },
    {},
  );

  const nodes = Object.values(groupedNodes);

  const currentNodesWeight = nodesWeight.filter(
    item => item.id in groupedNodes,
  );

  const totalWeights = currentNodesWeight.reduce(
    (acc, el) => acc + el.weight,
    0,
  );

  return nodes
    .map(node => {
      const nodeWeight = currentNodesWeight.find(el => el.id === node.nodeId);

      if (nodeWeight) {
        const percentWeight = (100 * nodeWeight.weight) / totalWeights || 0;

        return {
          ...node,
          score: nodeWeight.score,
          weight: new BigNumber(percentWeight),
          height: nodeWeight.height,
        };
      }

      return {
        ...node,
        score: 0,
        weight: new BigNumber(0),
        height: 0,
      };
    })
    .filter(({ height }) => height > 0)
    .sort((a, b) => {
      const firstLevel = b.height - a.height;
      const secondLevel = b.weight.toNumber() - a.weight.toNumber();
      const thirdLevel = (a.organization || '').localeCompare(
        b.organization || '',
      );

      return firstLevel || secondLevel || thirdLevel;
    });
};

export function isHeightColVisibleStatus(status: StatusCircleStatus): boolean {
  const visibleStatuses = ['warning', 'error'];
  return visibleStatuses.includes(status);
}

export const useChainNodesTableTableColumns = () => {
  const theme = useTheme();
  const classes = useStyles();

  return useLocaleMemo(
    () =>
      [
        {
          width: '40%',
          field: 'node',
          headerName: t('chain-item.nodes-table.head.node'),
          render: ({ score, organization }) => {
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
          render: ({ score, height }) => {
            const nodeStatus = getStatusByNodeScore(score);

            return (
              <Typography
                style={{
                  color: isHeightColVisibleStatus(nodeStatus)
                    ? getStatusColor(theme, nodeStatus)
                    : 'inherit',
                }}
                variant="inherit"
              >
                {height}
              </Typography>
            );
          },
        },
        {
          width: '30%',
          field: 'location',
          headerName: t('chain-item.nodes-table.head.location'),
          render: ({ country, city, continent }) => {
            return (
              country && (
                <>
                  <ReactCountryFlag
                    svg
                    className={classes.flag}
                    countryCode={country}
                  />
                  &nbsp; &nbsp;
                  {city}
                  &nbsp; ({t(`continents.${continent}`)})
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

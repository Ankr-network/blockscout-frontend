import { StatusCircleStatus } from 'uiKit/StatusCircle';
import { capitalize } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { INodeEntity } from 'multirpc-sdk';

import {
  ProviderRow,
  ChainNodesTableProps,
  GroupedNode,
} from './ChainNodesTableProps';

export const getRows = (data: ChainNodesTableProps['data']): ProviderRow[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

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
          chainName: capitalize(node.blockchain),
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

  return nodes.map(node => {
    return {
      ...node,
      score: 0,
      weight: new BigNumber(0),
      height: 0,
    };
  });
};

export function isHeightColVisibleStatus(status: StatusCircleStatus): boolean {
  const visibleStatuses = ['warning', 'error'];
  return visibleStatuses.includes(status);
}

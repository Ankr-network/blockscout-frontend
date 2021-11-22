import { capitalize } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { INodeEntity } from '@ankr.com/multirpc';

import {
  ProviderRow,
  ChainNodesTableProps,
  GroupedNode,
} from './ChainNodesTableProps';

export const getRows = (
  data: ChainNodesTableProps['data'],
  nodesWeight: ChainNodesTableProps['nodesWeight'],
): ProviderRow[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const groupedNodes = data.reduce<Record<string, GroupedNode>>(
    (result: any, node: INodeEntity | any) => {
      const groupBy = [
        node.blockchain,
        node.continent,
        node.country,
        node.city,
        node.organization,
      ].join(',');

      if (!result[groupBy]) {
        result[groupBy] = {
          id: groupBy,
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
        result[groupBy].totalNodes++;
      }

      if (node.isArchive) {
        result[groupBy].archiveNodes++;
      }

      return result;
    },
    {},
  );

  const nodes = Object.values(groupedNodes);

  const currentNodesWeight = nodesWeight
    ?.filter(el => el.weight)
    ?.filter(item => nodes?.find(el => el.nodeId === item.id));

  const totalWeights =
    currentNodesWeight?.reduce((acc, el) => acc + el.weight, 0) || 0;

  return nodes.map(node => {
    const { weight, ...other } = node;
    const nodeWeight = currentNodesWeight?.find(el => el.id === node.nodeId);

    if (!nodeWeight) return other;

    const percentWeight = (100 * nodeWeight.weight) / totalWeights || 0;

    return {
      ...other,
      weight: new BigNumber(percentWeight),
      height: nodeWeight.height,
    };
  });
};

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

  const currentNodesWeight = nodesWeight
    ?.filter(el => el.weight)
    ?.filter(item => nodes?.find(el => el.nodeId === item.id));

  const totalWeights =
    currentNodesWeight?.reduce((acc, el) => acc + el.weight, 0) || 0;

  return nodes
    .map(node => {
      const nodeWeight = currentNodesWeight?.find(el => el.id === node.nodeId);

      if (!nodeWeight) return { ...node, height: 0, weight: new BigNumber(0) };

      const percentWeight = (100 * nodeWeight.weight) / totalWeights || 0;

      return {
        ...node,
        weight: new BigNumber(percentWeight),
        height: nodeWeight.height,
      };
    })
    .sort((a, b) => b.weight.toNumber() - a.weight.toNumber())
    .sort((a, b) => {
      if (b.weight.toNumber() === a.weight.toNumber()) {
        return (a?.organization || '').localeCompare(b?.organization || '');
      }

      return 0;
    });
};

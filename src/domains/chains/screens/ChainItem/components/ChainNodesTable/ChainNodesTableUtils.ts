import { capitalize } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { INodeEntity } from '@ankr.com/multirpc';

import { ProviderRow, ChainNodesTableProps } from './ChainNodesTableProps';

export const getRows = (
  data: ChainNodesTableProps['data'],
  nodesWeight: ChainNodesTableProps['nodesWeight'],
): ProviderRow[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const groupedNodes = data.reduce<Record<string, ProviderRow>>(
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

  const totalWeights =
    nodesWeight?.reduce((acc, el) => acc + el.weight, 0) || 0;

  const nodes = Object.values(groupedNodes);
  // @ts-ignore
  return nodes.map(node => {
    const nodeWeight = nodesWeight?.find(el => el.id === node.nodeId);

    if (!nodeWeight) return node;

    const percentWeight = (100 * nodeWeight.weight) / totalWeights || 0;

    return {
      ...node,
      weight: new BigNumber(percentWeight),
      height: nodeWeight.height,
    };
  });
};

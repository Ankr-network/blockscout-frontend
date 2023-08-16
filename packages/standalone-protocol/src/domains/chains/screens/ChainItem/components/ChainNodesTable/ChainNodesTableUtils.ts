import { capitalize } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { INodeDetailEntity } from 'multirpc-sdk';

import { StatusCircleStatus } from 'uiKit/StatusCircle';

import { ProviderRow, ChainNodesTableProps } from './ChainNodesTableProps';

export const getRows = (
  nodesDetail: ChainNodesTableProps['nodesDetail'],
): ProviderRow[] => {
  if (!Array.isArray(nodesDetail) || nodesDetail.length === 0) return [];

  const node = nodesDetail[0];
  const { id, name } = node;

  const nodes = node?.nodes.map((item: INodeDetailEntity) => {
    const { scheme, location, height, weight, score } = item;

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

      return { ...item, weight: new BigNumber(percentWeight) };
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

import { capitalize } from '@material-ui/core';
import { INodeEntity } from '@ankr.com/multirpc/dist/types';
import { ProviderRow, ProvidersTableProps } from './ProvidersTableProps';

export const HAS_ORGANISATION = true;

export const getRows = (data: ProvidersTableProps['data']): ProviderRow[] => {
  const groupedNodes = data.reduce<Record<string, ProviderRow>>(
    (result: any, node: INodeEntity | any) => {
      const groupBy = [
        node.blockchain,
        node.continent,
        node.country,
        node.city,
        node.organization,
      ].join(',');
      if (!result[groupBy])
        result[groupBy] = {
          id: groupBy,
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
      if (node.isArchive) {
        result[groupBy].archiveNodes++;
      }
      return result;
    },
    {},
  );
  return Object.values(groupedNodes);
};

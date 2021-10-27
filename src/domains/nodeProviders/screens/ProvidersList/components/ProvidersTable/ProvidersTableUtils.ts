import { useCallback, useState } from 'react';
import { capitalize } from '@material-ui/core';

import { ProviderRow, ProvidersTableProps } from './ProvidersTableProps';
import { INodeEntity } from '@ankr.com/multirpc/dist/types';

export const HAS_ORGANISATION = true;

export const usePagination = (rows: ProviderRow[], rowsPerPage = 8) => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const pageNumber = pageIndex + 1;
  const pagesCount = Math.ceil(rows.length / rowsPerPage);
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageNumber === pagesCount;

  const handleChangePage = useCallback(
    (newPage: number) => {
      if (isFirstPage && newPage <= pageIndex) {
        return;
      }
      if (isLastPage && newPage >= pageIndex) {
        return;
      }
      setPageIndex(newPage);
    },
    [isFirstPage, isLastPage, pageIndex],
  );

  return {
    isFirstPage,
    isLastPage,
    pageIndex,
    pagesCount,
    handleChangePage,
    rowsPerPage,
  };
};

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

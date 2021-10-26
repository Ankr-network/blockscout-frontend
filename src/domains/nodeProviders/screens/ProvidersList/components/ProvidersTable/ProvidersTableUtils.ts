import { useCallback, useState } from 'react';
import { capitalize } from '@material-ui/core';

import { ProviderRow, ProvidersTableProps } from './ProvidersTableProps';
import { INodeEntity } from '@ankr.com/multirpc/dist/types';

export const HAS_ORGANISATION = false;

export const ROWS_PER_PAGE = 8;

export const usePagination = (rows: ProviderRow[]) => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const pageNumber = pageIndex + 1;
  const pagesCount = Math.ceil(rows.length / ROWS_PER_PAGE);
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

  return { isFirstPage, isLastPage, pageIndex, pagesCount, handleChangePage };
};

export const getRows = (data: ProvidersTableProps['data']): ProviderRow[] => {
  const groupedNodes = data.reduce<Record<string, ProviderRow>>(
    (result: any, node: INodeEntity | any) => {
      const groupBy = `${node.blockchain}/${node.continent}/${node.country}`;
      if (!result[groupBy])
        result[groupBy] = {
          id: groupBy,
          blockchain: node.blockchain,
          scheme: node.scheme,
          continent: node.continent,
          country: node.country,
          totalNodes: 0,
          icon: node.icon,
          organization: undefined,
          chainName: capitalize(node.blockchain),
        };
      result[groupBy].totalNodes++;
      return result;
    },
    {},
  );
  return Object.values(groupedNodes);
};

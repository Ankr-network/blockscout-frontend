import { useState, useCallback } from 'react';
import { capitalize } from '@material-ui/core';

import { ProvidersTableProps, ProviderRow } from './ProvidersTableProps';

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
  return data.map(item => {
    const { id, continent, blockchain, scheme } = item;

    return {
      id,
      location: continent,
      chain: capitalize(blockchain),
      type: scheme,
    };
  });
};

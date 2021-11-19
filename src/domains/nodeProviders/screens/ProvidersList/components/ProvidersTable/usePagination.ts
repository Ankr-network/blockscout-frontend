import { useCallback, useMemo, useState } from 'react';
import { ProvidersTableProps } from './ProvidersTableProps';
import { getRows } from './ProvidersTableUtils';

export const usePagination = (
  data: ProvidersTableProps['data'],
  rowsPerPageCount = 8,
) => {
  const rows = useMemo(() => getRows(data), [data]);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const pageNumber = pageIndex + 1;
  const pagesCount = Math.ceil(rows.length / rowsPerPageCount);
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

  const rowsForCurrentPage = rows.slice(
    pageIndex * rowsPerPageCount,
    pageIndex * rowsPerPageCount + rowsPerPageCount,
  );

  return {
    isFirstPage,
    isLastPage,
    pageIndex,
    pagesCount,
    handleChangePage,
    rowsForCurrentPage,
  };
};

import { t } from 'common';
import { IRequestsEntity, IRequestsResponse } from 'multirpc-sdk';
import { useCallback } from 'react';
import { VirtualTable, TableProps } from 'ui';
import { RequestExplorerExpand } from './components/RequestExplorerExpand';
import { useRequestExplorerTableColumns } from './RequestExplorerTableUtils';

export const RequestExplorerTable = ({
  data,
  isLoading,
  onChangePage,
  onSort,
}: Pick<
  TableProps<IRequestsEntity>,
  'isLoading' | 'onChangePage' | 'onSort'
> & {
  data: IRequestsResponse;
}) => {
  const renderExpand = useCallback(
    (row: IRequestsEntity, recalculateRows: () => void) => {
      return (
        <RequestExplorerExpand row={row} recalculateRows={recalculateRows} />
      );
    },
    [],
  );

  const columns = useRequestExplorerTableColumns();

  return (
    <VirtualTable
      cols={columns}
      isMoreRowsAvailable={data.cursor !== -1}
      pagination="more"
      renderExpand={renderExpand}
      minWidth={890}
      moreBtnText={t('explorer.request-explorer.more')}
      onChangePage={onChangePage}
      onSort={onSort}
      rows={data.requests}
      isLoading={isLoading}
    />
  );
};

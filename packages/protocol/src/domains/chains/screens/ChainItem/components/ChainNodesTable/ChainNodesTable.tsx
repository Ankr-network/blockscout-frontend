import { Paper, TableContainer, Typography } from '@material-ui/core';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { useCallback, useMemo, useState } from 'react';
import { VirtualTable, VirtualTableQuery } from 'ui';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { ChainNodesTableProps } from './ChainNodesTableProps';
import {
  CHAIN_NODES_TABLE_PAGE_SIZE,
  getRows,
  useChainNodesTableTableColumns,
} from './ChainNodesTableUtils';
import { useStyles } from './useStyles';

export const ChainNodesTable = ({
  data,
  nodesWeight,
}: ChainNodesTableProps) => {
  const classes = useStyles();
  const columns = useChainNodesTableTableColumns();
  const [page, setPage] = useState(1);
  const rows = useMemo(() => getRows(data, nodesWeight), [data, nodesWeight]);

  const slicedRows = useMemo(
    () => rows.slice(0, page * CHAIN_NODES_TABLE_PAGE_SIZE),
    [rows, page],
  );

  const handleChangePage = useCallback((params: VirtualTableQuery) => {
    setPage(params.page || 1);
  }, []);

  return (
    <TableContainer component={Paper} className={classes.root} elevation={0}>
      <TooltipWrapper
        hasIcon
        tooltipText={tHTML('chain-item.nodes-table.tooltip-text')}
      >
        <Typography variant="h5" className={classes.header}>
          {t('chain-item.nodes-table.header')}
        </Typography>
      </TooltipWrapper>

      <VirtualTable
        cols={columns}
        pagination="more"
        onChangePage={handleChangePage}
        moreBtnText={t('chain-item.nodes-table.more')}
        rows={slicedRows}
        isMoreRowsAvailable={slicedRows.length < rows.length}
        classes={{ container: classes.tableContainer }}
        minWidth={550}
        emptyMessage={t('chain-item.nodes-table.empty')}
      />
    </TableContainer>
  );
};

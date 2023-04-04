import { useMemo } from 'react';
import { Paper, TableContainer } from '@mui/material';
import { t } from '@ankr.com/common';

import { VirtualTable } from 'uiKit/VirtualTable';
import { LocationsTableProps } from './LocationsTableProps';
import { getRows, useColumns } from './LocationsTableUtils';
import { useLocationsTableStyles } from './useLocationsTableStyles';
import { TABLE_WIDTH } from '../../useChainNodesLocationsStyles';

export const LocationsTable = ({
  loading,
  nodesDetail,
}: LocationsTableProps) => {
  const { classes } = useLocationsTableStyles();
  const columns = useColumns();

  const rows = useMemo(() => getRows(nodesDetail), [nodesDetail]);

  return (
    <TableContainer component={Paper} className={classes.root} elevation={0}>
      <VirtualTable
        initializing={loading}
        cols={columns}
        rows={rows}
        classes={{ container: classes.tableContainer, head: classes.tableHead }}
        minWidth={TABLE_WIDTH}
        emptyMessage={t('chain-item.locations.empty')}
      />
    </TableContainer>
  );
};

import { Box } from '@mui/material';
import { t } from '@ankr.com/common';

import { useTableHeadStyles } from './TableHeadStyles';

const column1 = t('chain-item.usage-data.last-requests.table.header.column-1');
const column2 = t('chain-item.usage-data.last-requests.table.header.column-2');
const column3 = t('chain-item.usage-data.last-requests.table.header.column-3');

export const TableHead = () => {
  const { classes } = useTableHeadStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.row}>
        <Box className={classes.cell}>{column1}</Box>
        <Box className={classes.cell}>{column2}</Box>
        <Box className={classes.cell}>{column3}</Box>
      </Box>
    </Box>
  );
};

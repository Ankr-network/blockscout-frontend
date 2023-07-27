import { Box } from '@mui/material';
import { t } from '@ankr.com/common';

import { useTableHeadStyles } from './TableHeadStyles';

export const TableHead = () => {
  const { classes } = useTableHeadStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.row}>
        <Box className={classes.cell}>
          {t('chain-item.usage-data.last-requests.table.header.column-1')}
        </Box>
        <Box className={classes.cell}>
          {t('chain-item.usage-data.last-requests.table.header.column-2')}
        </Box>
        <Box className={classes.cell}>
          {t('chain-item.usage-data.last-requests.table.header.column-3')}
        </Box>
      </Box>
    </Box>
  );
};

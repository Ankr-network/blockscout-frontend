import { TableHead as MuiTableHead, TableRow, Typography } from '@mui/material';

import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { CommonCell } from '../CommonCell';
import { tableHeadTranslation } from './translation';
import { useTableHeadStyles } from './useTableHeadStyles';

export const TableHead = () => {
  const isMobile = useIsSMDown();

  const { classes } = useTableHeadStyles();
  const { keys, t } = useTranslation(tableHeadTranslation);

  return (
    <MuiTableHead>
      <TableRow>
        <CommonCell className={classes.cell}>
          <Typography color="textSecondary" variant="body3">
            {t(keys.dateTitle)}
          </Typography>
        </CommonCell>
        <CommonCell
          className={classes.cell}
          align={isMobile ? 'right' : 'left'}
        >
          <Typography color="textSecondary" variant="body3">
            {t(keys.amountTitle)}
          </Typography>
        </CommonCell>
      </TableRow>
    </MuiTableHead>
  );
};

import { Typography } from '@mui/material';

import { TableVariant } from '../../types';
import { useTableRowStyles } from './TableRowStyles';

export interface TableRowProps {
  blockchain: string;
  hasNoWrap?: boolean;
  payload: string;
  timestamp: string;
  variant: TableVariant;
}

export const TableRow = ({
  blockchain,
  hasNoWrap,
  payload,
  timestamp,
  variant,
}: TableRowProps) => {
  const { classes } = useTableRowStyles(variant);

  return (
    <>
      <Typography className={classes.cell} component="span" variant="subtitle2">
        {blockchain}
      </Typography>
      <Typography
        className={classes.cell}
        component="span"
        variant="subtitle2"
        noWrap={hasNoWrap}
      >
        {payload}
      </Typography>
      <Typography className={classes.cell} component="span" variant="subtitle2">
        {timestamp}
      </Typography>
    </>
  );
};

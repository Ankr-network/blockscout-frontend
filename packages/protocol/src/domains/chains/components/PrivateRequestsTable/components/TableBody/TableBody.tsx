import { Box } from '@mui/material';
import { LatestRequest } from 'multirpc-sdk';

import { TableRow } from '../TableRow';
import { TableVariant } from '../../types';
import { formatPayload } from '../../utils/formatPayload';
import { formatTimestamp } from '../../utils/formatTimestamp';
import { hasLongMethod } from '../../utils/hasLongMethod';
import { useTableBodyStyles } from './TableBodyStyles';

export interface TableBodyProps {
  requests?: LatestRequest[];
  variant: TableVariant;
}

export const TableBody = ({ requests = [], variant }: TableBodyProps) => {
  const { classes } = useTableBodyStyles(variant);

  return (
    <Box className={classes.root}>
      {requests.map(({ blockchain, payload, ts }) => (
        <TableRow
          blockchain={blockchain}
          hasNoWrap={hasLongMethod({ payload, variant })}
          key={ts}
          payload={formatPayload({ payload, variant })}
          timestamp={formatTimestamp(ts)}
          variant={variant}
        />
      ))}
    </Box>
  );
};

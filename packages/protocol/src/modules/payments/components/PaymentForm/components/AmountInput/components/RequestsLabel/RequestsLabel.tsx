import { Typography } from '@mui/material';

import { renderRequestsAmount } from 'modules/payments/utils/renderRequestsAmount';

import { useRequestsLabelStyles } from './useRequestsLabelStyles';

export interface IRequestsLabelProps {
  requests: number;
}

export const RequestsLabel = ({ requests }: IRequestsLabelProps) => {
  const { classes } = useRequestsLabelStyles();

  return (
    <Typography className={classes.requestsLabelRoot} variant="body2">
      {renderRequestsAmount({ isApproximate: true, requests })}
    </Typography>
  );
};

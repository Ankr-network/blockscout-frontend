import { Box, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useErrorMessageStyles } from './ErrorMessageStyles';

export interface ErrorMessageParams {
  error: unknown;
}

export const ErrorMessage = ({ error }: ErrorMessageParams) => {
  const code = (error as any)?.code;

  const { classes } = useErrorMessageStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.message} variant="body2">
        {t('chain-item.usage-data.last-requests.error')}{' '}
        {code && t('chain-item.usage-data.last-requests.error-code', { code })}
      </Typography>
    </Box>
  );
};

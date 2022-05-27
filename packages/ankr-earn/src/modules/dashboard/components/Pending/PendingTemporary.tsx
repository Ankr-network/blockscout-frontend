import { Typography } from '@material-ui/core';

import { t } from 'common';

import { usePendingStyles } from './usePendingStyles';

/**
 * Temporary component.
 *
 * Should be deprecated after completion of
 * https://ankrnetwork.atlassian.net/browse/STAKAN-1302
 */
export const PendingTemporary = (): JSX.Element => {
  const classes = usePendingStyles();

  return (
    <Typography className={classes.root}>
      {t('dashboard.pending-temp')}
    </Typography>
  );
};

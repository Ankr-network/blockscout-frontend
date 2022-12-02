import { t, tHTML } from '@ankr.com/common';
import { Grid, Paper, Typography } from '@material-ui/core';

import { TWITTER_ANKR_STATUS_LINK } from 'modules/common/const';

import { ReactComponent as ErrorIcon } from './assets/error-icon.svg';
import { useSuspendBannerStyles } from './useSuspendBannerStyles';

export const SuspendBanner = (): JSX.Element => {
  const classes = useSuspendBannerStyles();

  return (
    <Paper className={classes.banner}>
      <Grid container spacing={1}>
        <Grid item xs="auto">
          <ErrorIcon className={classes.icon} />
        </Grid>

        <Grid item xs>
          <Typography className={classes.paragraph} variant="body2">
            {t('suspend-info.p1')}
          </Typography>

          <Typography className={classes.paragraph} variant="body2">
            {tHTML('suspend-info.p2', { link: TWITTER_ANKR_STATUS_LINK })}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

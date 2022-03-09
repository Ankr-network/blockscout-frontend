import { Box, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';

import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';

import { useFeatureItemStyles } from './useFeatureItemStyles';

interface IFeatureItemProps {
  title: string;
  mainHref: string;
  moreHref?: string;
  iconSlot: JSX.Element;
  token: Token;
  apy?: number;
  staked?: BigNumber;
}

export const FeatureItem = ({
  title,
  mainHref,
  moreHref,
  iconSlot,
  token,
  apy,
  staked,
}: IFeatureItemProps): JSX.Element => {
  const classes = useFeatureItemStyles();

  return (
    <Paper className={classNames(classes.root)}>
      {React.cloneElement(iconSlot, {
        className: classes.icon,
      })}

      <Box mb={2}>
        <Typography className={classes.title}>{title}</Typography>
      </Box>

      <Box className={classNames(classes.statsButtonsWrapper)}>
        <Grid container className={classNames(classes.stats)} spacing={3}>
          {typeof apy === 'number' ? (
            <Grid item>
              <Typography className={classNames(classes.statLabel)}>
                {t('features.apy')}
              </Typography>

              <Typography className={classNames(classes.statValue)}>
                {t('features.apy-value', { value: apy })}
              </Typography>
            </Grid>
          ) : null}

          {staked && (
            <Grid item>
              <Typography className={classNames(classes.statLabel)}>
                {t('features.staked')}
              </Typography>

              <Typography className={classNames(classes.statValue)}>
                {t('features.staked-amount', {
                  value: staked.toFormat(),
                  token,
                })}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid container className={classNames(classes.buttons)} spacing={2}>
          <Grid item xs>
            <NavLink
              fullWidth
              className={classes.button}
              href={mainHref}
              variant="contained"
            >
              {t('features.stake')}
            </NavLink>
          </Grid>

          {moreHref && (
            <Grid item xs>
              <NavLink
                fullWidth
                className={classes.button}
                href={moreHref}
                variant="outlined"
              >
                {t('features.learn-more')}
              </NavLink>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

import { Box, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { Token } from 'modules/common/types/token';
import { EToken } from 'modules/dashboard/types';
import { t } from 'modules/i18n/utils/intl';
import React from 'react';
import { NavLink } from 'uiKit/NavLink';
import { useFeatureItemStyles } from './useFeatureItemStyles';

interface IFeatureItemProps {
  title: string;
  mainHref: string;
  moreHref?: string;
  iconSlot: JSX.Element;
  token: Token | EToken;
  apy: number;
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
}: IFeatureItemProps) => {
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
        <Grid spacing={3} container className={classNames(classes.stats)}>
          <Grid item>
            <Typography className={classNames(classes.statLabel)}>
              {t('features.apy')}
            </Typography>

            <Typography className={classNames(classes.statValue)}>
              {t('features.apy-value', { value: apy })}
            </Typography>
          </Grid>

          {staked && (
            <Grid item>
              <Typography className={classNames(classes.statLabel)}>
                {t('features.staked')}
              </Typography>

              <Typography className={classNames(classes.statValue)}>
                {t('features.staked-amount', {
                  value: staked.toFormat(),
                  token: token,
                })}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid spacing={2} container className={classNames(classes.buttons)}>
          <Grid item xs>
            <NavLink
              href={mainHref}
              variant="contained"
              fullWidth
              className={classes.button}
            >
              {t('features.stake')}
            </NavLink>
          </Grid>

          {moreHref && (
            <Grid item xs>
              <NavLink
                href={moreHref}
                variant="outlined"
                fullWidth
                className={classes.button}
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

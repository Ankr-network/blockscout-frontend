import { Box, Grid, Paper, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';

import { AvailableWriteProviders } from 'provider';

import { trackEnterStakingFlow } from 'modules/analytics/tracking-actions/trackEnterStakingFlow';
import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { DEFAULT_ROUNDING } from 'modules/common/const';
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
  stakedTvl?: BigNumber;
}

export const FeatureItem = ({
  title,
  mainHref,
  moreHref,
  iconSlot,
  token,
  apy,
  stakedTvl,
}: IFeatureItemProps): JSX.Element => {
  const classes = useFeatureItemStyles();
  const { address, walletName } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const onStakeClick = () => {
    trackEnterStakingFlow({
      walletType: walletName,
      walletPublicAddress: address,
      accessPoint: 'liquid_staking',
      tokenName: token,
    });
  };

  const shouldRenderTvl =
    stakedTvl && !stakedTvl.isNaN() && !stakedTvl.isZero();

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

          {shouldRenderTvl && (
            <Grid item>
              <Typography className={classNames(classes.statLabel)}>
                {t('features.staked-tvl')}
              </Typography>

              <Typography className={classNames(classes.statValue)}>
                {t('features.staked-amount', {
                  value: stakedTvl.toFormat(DEFAULT_ROUNDING),
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
              onClick={onStakeClick}
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

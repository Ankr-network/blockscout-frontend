import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { NavLink } from 'uiKit/NavLink';

import { FeatureItemBase } from './FeatureItemBase';
import { useFeatureItemStyles } from './useFeatureItemStyles';

interface IFeatureItemProps {
  title: string;
  mainHref: string;
  moreHref?: string;
  iconSlot: JSX.Element;
  token: Token;
  apy?: number;
  stakedTvl?: BigNumber;
  onStakeClick?: () => void;
}

export const FeatureItem = ({
  title,
  mainHref,
  moreHref,
  iconSlot,
  token,
  apy = 0,
  stakedTvl,
  onStakeClick,
}: IFeatureItemProps): JSX.Element => {
  const classes = useFeatureItemStyles();

  const shouldRenderTvl =
    stakedTvl && !stakedTvl.isNaN() && !stakedTvl.isZero();

  const shouldRenderAPY = typeof apy === 'number';

  return (
    <FeatureItemBase
      withAnimations
      buttonsSlot={
        <Grid container spacing={2}>
          <Grid item xs>
            <NavLink
              fullWidth
              className={classes.button}
              href={mainHref}
              variant="contained"
              onMouseDown={onStakeClick}
              onTouchStart={onStakeClick}
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
      }
      iconSlot={iconSlot}
      statsSlot={
        <Grid container spacing={3}>
          {shouldRenderAPY && (
            <Grid item>
              <Typography className={classNames(classes.statLabel)}>
                {t('features.apy')}
              </Typography>

              <Typography className={classNames(classes.statValue)}>
                {t('features.apy-value', { value: apy })}
              </Typography>
            </Grid>
          )}

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
      }
      title={title}
    />
  );
};

import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t } from 'common';

import { DEFAULT_FIXED } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { NavLink } from 'uiKit/NavLink';

import { FeatureItemBase } from './FeatureItemBase';
import { useFeatureItemStyles } from './useFeatureItemStyles';

interface IFeatureItemProps {
  title: string;
  mainHref: string;
  moreHref?: string;
  manageHref?: string;
  iconSlot: JSX.Element;
  token: Token;
  isApyLoading?: boolean;
  apy?: number;
  isTvlLoading?: boolean;
  isIntegerTvl?: boolean;
  stakedTvl?: BigNumber;
  onStakeClick?: () => void;
}

export const FeatureItem = ({
  title,
  mainHref,
  moreHref,
  manageHref,
  iconSlot,
  token,
  isApyLoading = false,
  isTvlLoading = false,
  isIntegerTvl = false,
  apy = 0,
  stakedTvl,
  onStakeClick,
}: IFeatureItemProps): JSX.Element => {
  const classes = useFeatureItemStyles();

  const shouldRenderTvl =
    stakedTvl && !stakedTvl.isNaN() && !stakedTvl.isZero();
  const tvlValue = isIntegerTvl
    ? stakedTvl?.integerValue().toFormat()
    : stakedTvl?.toFormat(DEFAULT_FIXED);

  const shouldRenderAPY = typeof apy === 'number' && apy !== 0;

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

          {manageHref && (
            <Grid item xs>
              <NavLink
                fullWidth
                className={classes.button}
                href={manageHref}
                variant="outlined"
              >
                {t('features.manage')}
              </NavLink>
            </Grid>
          )}
        </Grid>
      }
      iconSlot={iconSlot}
      statsSlot={
        <Grid container spacing={3}>
          <Grid item>
            {isApyLoading && !apy && (
              <Skeleton
                className={classes.skeleton}
                height={48}
                variant="rect"
                width={50}
              />
            )}

            {shouldRenderAPY && (
              <>
                <Typography className={classNames(classes.statLabel)}>
                  {t('features.apy')}
                </Typography>

                <Typography className={classNames(classes.statValue)}>
                  {t('features.apy-value', { value: apy })}
                </Typography>
              </>
            )}
          </Grid>

          <Grid item>
            {isTvlLoading && (
              <Skeleton
                className={classes.skeleton}
                height={48}
                variant="rect"
                width={200}
              />
            )}

            {!isTvlLoading && shouldRenderTvl && (
              <>
                <Typography className={classNames(classes.statLabel)}>
                  {t('features.staked-tvl')}
                </Typography>

                <Typography className={classNames(classes.statValue)}>
                  {t('features.staked-amount', {
                    value: tvlValue,
                    token,
                  })}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      }
      title={title}
    />
  );
};

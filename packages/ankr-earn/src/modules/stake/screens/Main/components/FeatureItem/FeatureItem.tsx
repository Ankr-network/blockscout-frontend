import { Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';

import { t } from 'common';

import { Token } from 'modules/common/types/token';
import { getDecimalPlaces } from 'modules/common/utils/numbers/getDecimalPlaces';
import { NavLink } from 'uiKit/NavLink';

import { FeatureItemBase } from './FeatureItemBase';
import { useFeatureItemStyles } from './useFeatureItemStyles';

interface IFeatureItemProps {
  title: string;
  mainHref?: string;
  moreHref?: string;
  manageHref?: string;
  iconRootClass?: string;
  iconSlot: JSX.Element;
  token: Token;
  isApyLoading?: boolean;
  apy?: number;
  isTvlLoading?: boolean;
  isIntegerTvl?: boolean;
  stakedTvl?: BigNumber;
  isDelegatedStaking?: boolean;
  onStakeClick?: () => void;
  onManageClick?: () => void;
}

export const FeatureItem = ({
  title,
  mainHref = '',
  moreHref,
  manageHref,
  iconRootClass,
  iconSlot,
  token,
  isApyLoading = false,
  isTvlLoading = false,
  isIntegerTvl = false,
  isDelegatedStaking = false,
  apy = 0,
  stakedTvl,
  onStakeClick,
  onManageClick,
}: IFeatureItemProps): JSX.Element => {
  const classes = useFeatureItemStyles();

  const shouldRenderTvl =
    stakedTvl && !stakedTvl.isNaN() && !stakedTvl.isZero();
  const tvlValue = isIntegerTvl
    ? stakedTvl?.integerValue().toFormat()
    : stakedTvl?.toFormat(getDecimalPlaces(stakedTvl));

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
              disabled={!mainHref}
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
                color="primary"
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
                color="primary"
                href={manageHref}
                variant="outlined"
                onMouseDown={onManageClick}
                onTouchStart={onManageClick}
              >
                {t('features.manage')}
              </NavLink>
            </Grid>
          )}
        </Grid>
      }
      iconRootClass={iconRootClass}
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
                  {isDelegatedStaking ? t('features.apr') : t('features.apy')}
                </Typography>

                <Typography className={classNames(classes.statValue)}>
                  {t('features.apy-value', { value: apy })}
                </Typography>
              </>
            )}
          </Grid>

          <Grid item>
            {isTvlLoading && !stakedTvl && (
              <Skeleton
                className={classes.skeleton}
                height={48}
                variant="rect"
                width={200}
              />
            )}

            {shouldRenderTvl && (
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

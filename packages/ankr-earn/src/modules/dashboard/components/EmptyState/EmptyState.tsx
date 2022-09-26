import { Paper, Typography } from '@material-ui/core';

import { t } from 'common';

import { RoutesConfig as CalcRoutes } from 'modules/calc/Routes';
import { featuresConfig } from 'modules/common/const';
import { RoutesConfig } from 'modules/referrals/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { NavLink } from 'uiKit/NavLink';

import coinsMobileImg from './assets/coins-mobile.png';
import coinsMobileImg2x from './assets/coins-mobile@2x.png';
import coinsImg from './assets/coins.png';
import coinsImg2x from './assets/coins@2x.png';
import { useEmptyStateStyles } from './useEmptyStateStyles';

const STAKE_PATH = StakeRoutes.main.generatePath();
const CALC_PATH = CalcRoutes.main.generatePath();

const imgSources = {
  tablet: coinsImg,
  tablet2x: coinsImg2x,
  mobile: coinsMobileImg,
  mobile2x: coinsMobileImg2x,
};

// todo: change it
const IS_ACTIVE_REFERRAL_USER = true;

export const EmptyState = (): JSX.Element => {
  const classes = useEmptyStateStyles();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="h2">
        {t('dashboard.empty.title')}
      </Typography>

      <picture className={classes.imgWrap}>
        <source
          media="(min-width: 768px)"
          srcSet={`${imgSources.tablet}, ${imgSources.tablet2x} 2x`}
        />

        <source srcSet={`${imgSources.mobile}, ${imgSources.mobile2x} 2x`} />

        <img
          alt=""
          className={classes.img}
          loading="lazy"
          src={imgSources.tablet}
        />
      </picture>

      <div className={classes.buttons}>
        <NavLink
          fullWidth
          className={classes.button}
          href={STAKE_PATH}
          size="large"
          variant="contained"
        >
          {t('dashboard.empty.btn')}
        </NavLink>

        {featuresConfig.isCalcActive && (
          <div className={classes.header}>
            <div className={classes.buttonWrapper}>
              <NavLink
                fullWidth
                href={CALC_PATH}
                size="large"
                variant="outlined"
              >
                {t('dashboard.empty.calc-btn')}
              </NavLink>
            </div>
          </div>
        )}

        {featuresConfig.isReferralDashboardActive && IS_ACTIVE_REFERRAL_USER && (
          <NavLink
            className={classes.referralsLink}
            color="primary"
            href={RoutesConfig.main.generatePath()}
            variant="inline-text"
          >
            {t('dashboard.empty.referral-program')}
          </NavLink>
        )}
      </div>
    </Paper>
  );
};

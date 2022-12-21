import { t } from '@ankr.com/common';
import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import { useCallback } from 'react';

import { RoutesConfig as RoutesCalcConfig } from 'modules/calc/Routes';
import { featuresConfig } from 'modules/common/const';
import { RoutesConfig as RoutesReferralsConfig } from 'modules/referrals/Routes';
import { Checkbox } from 'uiKit/Checkbox';
import { NavLink } from 'uiKit/NavLink';

import { usePortfolioHeaderStyles } from './usePortfolioHeaderStyles';

interface PortfolioHeaderProps {
  isCurrentAccountPartner: boolean;
  isSmallBalancesVisible: boolean;
  onBalanceVisibilityChange: (isShown: boolean) => void;
}

export const PortfolioHeader = ({
  isCurrentAccountPartner,
  isSmallBalancesVisible,
  onBalanceVisibilityChange,
}: PortfolioHeaderProps): JSX.Element => {
  const classes = usePortfolioHeaderStyles();

  const onCheckboxChange = useCallback(
    (e, checked) => {
      onBalanceVisibilityChange(!checked);
    },
    [onBalanceVisibilityChange],
  );

  return (
    <Box mb={3}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs>
          <Typography className={classes.title} component="h1" variant="h3">
            {t('dashboard.portfolio')}
          </Typography>
        </Grid>

        {featuresConfig.isSmallBalancesActive && (
          <Grid item xs="auto">
            <Checkbox
              checked={!isSmallBalancesVisible}
              label={t('dashboard.hide-balances')}
              onChange={onCheckboxChange}
            />
          </Grid>
        )}

        {featuresConfig.isCalcActive && (
          <Hidden mdDown>
            <Grid item xs="auto">
              <NavLink
                className={classes.button}
                href={RoutesCalcConfig.main.generatePath()}
                variant="text"
              >
                {t('calc.title')}
              </NavLink>
            </Grid>
          </Hidden>
        )}

        {isCurrentAccountPartner && (
          <Hidden mdDown>
            <Grid item xs="auto">
              <NavLink
                className={classes.button}
                href={RoutesReferralsConfig.main.generatePath()}
                variant="text"
              >
                {t('referrals.title')}
              </NavLink>
            </Grid>
          </Hidden>
        )}
      </Grid>
    </Box>
  );
};

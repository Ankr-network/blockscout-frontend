import { t } from '@ankr.com/common';
import { Box, Grid, Hidden, Typography } from '@material-ui/core';

import { RoutesConfig as RoutesCalcConfig } from 'modules/calc/Routes';
import { featuresConfig, isLocal } from 'modules/common/const';
import { RoutesConfig as RoutesReferralsConfig } from 'modules/referrals/Routes';
import { Checkbox } from 'uiKit/Checkbox';
import { NavLink } from 'uiKit/NavLink';

import { useProtfolioHeaderStyles } from './useProtfolioHeaderStyles';

const IS_CHECKBOX_SHOWED = isLocal;

interface IProtfolioHeaderProps {
  isCurrentAccountPartner: boolean;
}

export const ProtfolioHeader = ({
  isCurrentAccountPartner,
}: IProtfolioHeaderProps): JSX.Element => {
  const classes = useProtfolioHeaderStyles();

  return (
    <Box mb={3}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs>
          <Typography className={classes.title} component="h1" variant="h3">
            {t('dashboard.portfolio')}
          </Typography>
        </Grid>

        {IS_CHECKBOX_SHOWED && (
          <Grid item xs="auto">
            <Checkbox
              checked
              disabled
              className={classes.checkbox}
              label={t('dashboard.hide-balances')}
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

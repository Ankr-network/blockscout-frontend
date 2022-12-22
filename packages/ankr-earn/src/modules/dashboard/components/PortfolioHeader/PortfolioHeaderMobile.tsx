import { t } from '@ankr.com/common';
import { Box, Divider, Hidden } from '@material-ui/core';

import { RoutesConfig } from 'modules/calc/Routes';
import { featuresConfig } from 'modules/common/const';
import { RoutesConfig as RoutesReferralsConfig } from 'modules/referrals/Routes';
import { NavLink } from 'uiKit/NavLink';

import { usePortfolioHeaderStyles } from './usePortfolioHeaderStyles';

interface IPortfolioHeaderMobileProps {
  isCurrentAccountPartner: boolean;
}

export const PortfolioHeaderMobile = ({
  isCurrentAccountPartner,
}: IPortfolioHeaderMobileProps): JSX.Element => {
  const classes = usePortfolioHeaderStyles();

  return (
    <Hidden lgUp>
      <Box display="flex" justifyContent="space-between" mb={3}>
        {featuresConfig.isCalcActive && (
          <NavLink
            className={classes.link}
            color="primary"
            href={RoutesConfig.main.generatePath()}
            variant="inline-text"
          >
            {t('calc.title')}
          </NavLink>
        )}

        {isCurrentAccountPartner && (
          <>
            <Divider
              className={classes.divider}
              orientation="vertical"
              variant="middle"
            />

            <NavLink
              className={classes.link}
              color="primary"
              href={RoutesReferralsConfig.main.generatePath()}
              variant="inline-text"
            >
              {t('referrals.title')}
            </NavLink>
          </>
        )}
      </Box>
    </Hidden>
  );
};

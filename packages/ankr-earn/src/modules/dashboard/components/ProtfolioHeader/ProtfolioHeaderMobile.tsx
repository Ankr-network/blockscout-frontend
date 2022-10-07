import { Box, Divider, Hidden } from '@material-ui/core';

import { t } from 'common';

import { RoutesConfig } from 'modules/calc/Routes';
import { featuresConfig } from 'modules/common/const';
import { RoutesConfig as RoutesReferralsConfig } from 'modules/referrals/Routes';
import { NavLink } from 'uiKit/NavLink';

import { useProtfolioHeaderStyles } from './useProtfolioHeaderStyles';

interface IProtfolioHeaderMobileProps {
  isCurrentAccountPartner: boolean;
}

export const ProtfolioHeaderMobile = ({
  isCurrentAccountPartner,
}: IProtfolioHeaderMobileProps): JSX.Element => {
  const classes = useProtfolioHeaderStyles();

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

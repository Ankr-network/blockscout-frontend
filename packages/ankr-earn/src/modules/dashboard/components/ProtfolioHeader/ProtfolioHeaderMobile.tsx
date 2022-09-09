import { Box, Hidden } from '@material-ui/core';

import { t } from 'common';

import { RoutesConfig } from 'modules/calc/Routes';
import { featuresConfig } from 'modules/common/const';
import { NavLink } from 'uiKit/NavLink';

import { useProtfolioHeaderStyles } from './useProtfolioHeaderStyles';

export const ProtfolioHeaderMobile = (): JSX.Element => {
  const classes = useProtfolioHeaderStyles();

  return (
    <Hidden lgUp>
      <Box mb={3}>
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
      </Box>
    </Hidden>
  );
};

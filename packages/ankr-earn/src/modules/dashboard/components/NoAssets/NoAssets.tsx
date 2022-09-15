import { t } from 'common';

import { RoutesConfig } from 'modules/stake/Routes';
import { NavLink } from 'uiKit/NavLink';

import { Placeholder } from '../Placeholder';

import portfolioStartStaking from './assets/portfolio-start-staking.png';
import { useNoAssetsStyles as useStyles } from './useNoAssetsStyles';

export const NoAssets = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Placeholder
      btnSlot={
        <NavLink
          className={classes.button}
          href={RoutesConfig.main.generatePath()}
          size="medium"
          variant="contained"
        >
          {t('dashboard.stake')}
        </NavLink>
      }
      src={portfolioStartStaking}
      title={t('dashboard.start-staking')}
    />
  );
};

import { Paper, Typography } from '@material-ui/core';
import { useNoAssetsStyles as useStyles } from './useNoAssetsStyles';
import PortfolioStartStaking from './assets/portfolio-start-staking.png';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';
import { RoutesConfig } from 'modules/stake/Routes';

export const NoAssets = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <img src={PortfolioStartStaking} alt={t('dashboard.start-staking')} />
      <Typography className={classes.text}>
        {t('dashboard.start-staking')}
      </Typography>
      <NavLink
        size="medium"
        variant="contained"
        href={RoutesConfig.main.generatePath()}
        className={classes.button}
      >
        {t('dashboard.stake')}
      </NavLink>
    </Paper>
  );
};

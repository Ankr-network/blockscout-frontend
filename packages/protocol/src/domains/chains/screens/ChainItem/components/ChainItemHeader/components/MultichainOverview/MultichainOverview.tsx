import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { NavBarAdvancedApi } from '@ankr.com/ui';

import { useMultichainOverviewStyles } from './MultichainOverviewStyles';

export const MultiChainOverview = () => {
  const { classes } = useMultichainOverviewStyles();

  return (
    <div>
      <div className={classes.title}>
        <div className={classes.iconRoot}>
          <NavBarAdvancedApi className={classes.icon} />
        </div>
        <Typography variant="h6" className={classes.text}>
          {t('advanced-api.chain-overview.title')}
        </Typography>
      </div>
      <Typography variant="body3" color="textSecondary">
        {t('advanced-api.chain-overview.description')}
      </Typography>
    </div>
  );
};

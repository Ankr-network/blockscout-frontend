import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMultichainOverviewStyles } from './MultichainOverviewStyles';

export const MultiChainOverview = () => {
  const { classes } = useMultichainOverviewStyles();

  return (
    <>
      <Typography variant="h5" className={classes.text}>
        {t('advanced-api.chain-overview.title')}
      </Typography>
      <Typography variant="body2">
        {t('advanced-api.chain-overview.description')}
      </Typography>
    </>
  );
};

import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';
import imgNoResult from './assets/noResult.png';
import { useChainListStyles } from './useChainListStyles';

export const NoResult = () => {
  const { classes } = useChainListStyles();

  return (
    <div className={classes.container}>
      <img src={imgNoResult} alt={t('common.no-search-result')} />
      <Typography className={classes.text}>
        {t('common.no-search-result')}
      </Typography>
    </div>
  );
};

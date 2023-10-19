import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import imgNoResult from './assets/noResult.png';
import { useNoResultStyles } from './useNoResultStyles';

export const NoResult = () => {
  const { classes } = useNoResultStyles();

  return (
    <div className={classes.container}>
      <img src={imgNoResult} alt={t('common.no-search-result')} />
      <Typography className={classes.text}>
        {t('common.no-search-result')}
      </Typography>
    </div>
  );
};

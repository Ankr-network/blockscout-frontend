import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';
import { ReactComponent as NoResultIcon } from './assets/noResult.svg';
import { useChainListStyles } from './useChainListStyles';

export const NoResult = () => {
  const { classes } = useChainListStyles();

  return (
    <div className={classes.container}>
      <NoResultIcon />
      <Typography className={classes.text}>
        {t('common.no-search-result')}
      </Typography>
    </div>
  );
};

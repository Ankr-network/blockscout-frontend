import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useButtonsSeparatorStyles } from './useButtonsSeparatorStyles';

export const ButtonsSeparator = () => {
  const { classes } = useButtonsSeparatorStyles();

  return (
    <Typography className={classes.root} component="div" variant="subtitle3">
      {t('signup-modal.web2.or')}
    </Typography>
  );
};

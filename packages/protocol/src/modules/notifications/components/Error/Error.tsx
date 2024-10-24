import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { translation } from '../../translation';
import { useErrorStyles } from './useErrorStyles';

export const Error = () => {
  const { classes } = useErrorStyles();
  const { keys, t } = useTranslation(translation);

  return (
    <div className={classes.root}>
      <Typography variant="body3">{t(keys.errorOccured)}</Typography>
    </div>
  );
};

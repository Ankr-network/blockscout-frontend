import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useScalePlansStyles } from './useScalePlansStyles';
import { scalePlansTranslation } from './scalePlansTranslation';
import { HttpsBlock } from './HttpsBlock';
import { WssBlock } from './WssBlock';

export const ScalePlans = () => {
  const { classes } = useScalePlansStyles();

  const { keys, t, tHTML } = useTranslation(scalePlansTranslation);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {t(keys.title)}
      </Typography>
      <Typography variant="body2" component="p" className={classes.subtitle}>
        {tHTML(keys.subtitle)}
      </Typography>
      <HttpsBlock />
      <WssBlock />
    </div>
  );
};

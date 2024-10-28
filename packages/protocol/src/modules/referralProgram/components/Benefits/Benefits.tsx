import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { benefitsTranslation } from './translation';
import { useBenefitsStyles } from './useBenefitsStyles';

export const Benefits = () => {
  const { keys, t, tHTML } = useTranslation(benefitsTranslation);
  const { classes } = useBenefitsStyles();

  return (
    <Typography className={classes.root} component="ul" variant="body2">
      <li>{tHTML(keys.freeAccess)}</li>
      <li>{t(keys.rateLimits)}</li>
      <li>{t(keys.usageStats)}</li>
    </Typography>
  );
};

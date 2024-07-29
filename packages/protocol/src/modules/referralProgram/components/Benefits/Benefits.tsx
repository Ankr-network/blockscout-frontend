import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { benefitsTranslation } from './translation';
import { useBenefitsStyles } from './useBenefitsStyles';

export interface IBenefitsProps {
  blockchainName: string | undefined;
}

export const Benefits = ({ blockchainName }: IBenefitsProps) => {
  const { keys, t, tHTML } = useTranslation(benefitsTranslation);
  const { classes } = useBenefitsStyles();

  return (
    <Typography className={classes.root} component="ul" variant="body2">
      <li>{tHTML(keys.freeAccess, { blockchainName })}</li>
      <li>{t(keys.apiCredits)}</li>
      <li>{t(keys.rateLimits)}</li>
      <li>{t(keys.usageStats)}</li>
    </Typography>
  );
};

import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { greetingTranslation } from './translation';
import { useGreetingStyles } from './useGreetingStyles';

export interface IGreetingProps {
  blockchainName: string | undefined;
}

export const Greeting = ({ blockchainName }: IGreetingProps) => {
  const { keys, t, tHTML } = useTranslation(greetingTranslation);

  const { classes } = useGreetingStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {t(keys.title)}
      </Typography>
      <Typography variant="body2">
        {t(keys.description, { blockchainName })}
      </Typography>
      <Typography className={classes.benefits} component="ul" variant="body2">
        <li>{tHTML(keys.apiCreditsBenefit, { blockchainName })}</li>
        <li>{tHTML(keys.exclusiveAssetsBenefit, { blockchainName })}</li>
      </Typography>
      <Typography variant="body2">{t(keys.invitationToSignIn)}</Typography>
    </div>
  );
};

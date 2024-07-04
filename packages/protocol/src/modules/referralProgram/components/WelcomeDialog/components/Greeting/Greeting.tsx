import { Typography } from '@mui/material';

import { Benefits } from 'modules/referralProgram/components/Benefits';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { greetingTranslation } from './translation';
import { useGreetingStyles } from './useGreetingStyles';

export interface IGreetingProps {
  blockchainName: string | undefined;
}

export const Greeting = ({ blockchainName }: IGreetingProps) => {
  const { keys, t } = useTranslation(greetingTranslation);

  const { classes } = useGreetingStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {t(keys.title, { blockchainName })}
      </Typography>
      <Typography variant="body2">
        {t(keys.description, { blockchainName })}
      </Typography>
      <Benefits blockchainName={blockchainName} />
      <Typography variant="body2">
        {t(keys.invitationToSignIn, { blockchainName })}
      </Typography>
    </div>
  );
};

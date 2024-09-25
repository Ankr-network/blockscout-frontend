import { Typography } from '@mui/material';

import { Benefits } from 'modules/referralProgram/components/Benefits';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { greetingTranslation } from './translation';
import { useGreetingStyles } from './useGreetingStyles';

export interface IGreetingProps {
  blockchainName: string | undefined;
}

export const Greeting = ({ blockchainName }: IGreetingProps) => {
  const { isLoggedIn } = useAuth();

  const {
    keys: {
      brandedLoggedIn,
      brandedLoggedOut,
      unbrandedLoggedIn,
      unbrandedLoggedOut,
    },
    t,
    tHTML,
  } = useTranslation(greetingTranslation);

  const [loggedInKeys, loggedOutKeys] = blockchainName
    ? [brandedLoggedIn, brandedLoggedOut]
    : [unbrandedLoggedIn, unbrandedLoggedOut];

  const keys = isLoggedIn ? loggedInKeys : loggedOutKeys;

  const { classes } = useGreetingStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {t(keys.title)}
      </Typography>
      <Typography variant="body2">
        {tHTML(keys.description, { blockchainName })}
      </Typography>
      {blockchainName && <Benefits blockchainName={blockchainName} />}
      <Typography variant="body2">
        {tHTML(keys.invitationToSignIn, { blockchainName })}
      </Typography>
    </div>
  );
};

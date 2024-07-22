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
  } = useTranslation(greetingTranslation);

  const [loggedInKeys, loggedOutKeys] = blockchainName
    ? [brandedLoggedIn, brandedLoggedOut]
    : [unbrandedLoggedIn, unbrandedLoggedOut];

  const keys = isLoggedIn ? loggedInKeys : loggedOutKeys;

  const shouldRenderInivtation = Boolean(blockchainName) || !isLoggedIn;

  const { classes } = useGreetingStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6">
        {t(keys.title)}
      </Typography>
      <Typography variant="body2">{t(keys.description)}</Typography>
      {blockchainName && <Benefits blockchainName={blockchainName} />}
      {shouldRenderInivtation && (
        <Typography variant="body2">
          {t(keys.invitationToSignIn, { blockchainName })}
        </Typography>
      )}
    </div>
  );
};

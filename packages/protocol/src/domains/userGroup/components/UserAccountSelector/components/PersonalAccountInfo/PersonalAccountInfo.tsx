import { useAuth } from 'domains/auth/hooks/useAuth';

import { PersonalAccountButton } from '../PersonalAccountButton';
import { PersonalAccountInfoCopyButton } from './components/PersonalAccountInfoCopyButton';
import { usePersonalAccountInfoStyles } from './usePersonalAccountInfoStyles';

export interface PersonalAccountInfoProps {
  onAccountButtonClick: () => void;
}

export const PersonalAccountInfo = ({
  onAccountButtonClick,
}: PersonalAccountInfoProps) => {
  const { address, hasOauthLogin, hasWeb3Connection } = useAuth();

  const hasOauthWithoutWeb3 = Boolean(hasOauthLogin && !hasWeb3Connection);

  const { classes } = usePersonalAccountInfoStyles();

  return (
    <div className={classes.root}>
      <PersonalAccountButton onClick={onAccountButtonClick} />
      {!hasOauthWithoutWeb3 && (
        <PersonalAccountInfoCopyButton address={address} />
      )}
    </div>
  );
};

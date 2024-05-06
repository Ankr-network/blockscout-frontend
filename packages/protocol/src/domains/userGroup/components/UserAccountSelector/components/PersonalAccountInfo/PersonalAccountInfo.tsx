import { useAuth } from 'domains/auth/hooks/useAuth';
import { CopyButton } from 'uiKit/CopyButton';

import { PersonalAccountButton } from '../PersonalAccountButton';
import { usePersonalAccountInfoStyles } from './usePersonalAccountInfoStyles';

export interface PersonalAccountInfoProps {
  onAccountButtonClick: () => void;
}

export const PersonalAccountInfo = ({
  onAccountButtonClick,
}: PersonalAccountInfoProps) => {
  const { address, hasOauthWithoutWeb3 } = useAuth();

  const { classes } = usePersonalAccountInfoStyles();

  return (
    <div className={classes.root}>
      <PersonalAccountButton onClick={onAccountButtonClick} />
      {!hasOauthWithoutWeb3 && <CopyButton size="medium" text={address} />}
    </div>
  );
};

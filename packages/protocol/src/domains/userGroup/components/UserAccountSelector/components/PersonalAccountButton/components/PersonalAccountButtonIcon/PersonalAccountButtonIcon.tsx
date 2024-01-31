import { OauthLoginProvider } from 'multirpc-sdk';
import { WalletIcon } from '@ankr.com/ui';

import { OauthIcon } from 'domains/auth/components/SignupButton/components/OauthIcon';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { usePersonalAccountButtonIconStyles } from './usePersonalAccountButtonIconStyles';

export interface PersonalAccountButtonIconProps {
  hasOauthWithoutWeb3: boolean;
  oauthProvider?: OauthLoginProvider;
}

export const PersonalAccountButtonIcon = ({
  hasOauthWithoutWeb3,
  oauthProvider,
}: PersonalAccountButtonIconProps) => {
  const { walletMeta } = useAuth();

  const { classes } = usePersonalAccountButtonIconStyles();

  if (hasOauthWithoutWeb3) {
    return (
      <OauthIcon className={classes.oauthIcon} oauthProvider={oauthProvider} />
    );
  }

  const walletIcon = walletMeta?.icon;

  return <WalletIcon icon={walletIcon} />;
};

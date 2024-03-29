import { t } from '@ankr.com/common';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { SignoutButton } from '../../SignoutButton';

export const OauthSignoutButton = () => {
  const { handleSignOut } = useAuth();

  return <SignoutButton onClick={handleSignOut} title={t('header.sign-out')} />;
};

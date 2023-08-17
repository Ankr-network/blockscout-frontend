import { t } from '@ankr.com/common';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { SignoutButton } from '../../SignoutButton';

export const OauthSignoutButton = () => {
  const { handleSignout } = useAuth();

  return <SignoutButton onClick={handleSignout} title={t('header.sign-out')} />;
};

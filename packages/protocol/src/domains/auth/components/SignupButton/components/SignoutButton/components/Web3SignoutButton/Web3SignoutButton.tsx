import { t } from '@ankr.com/common';

import { useAuth } from 'domains/auth/hooks/useAuth';

import { SignoutButton } from '../../SignoutButton';

export const Web3SignoutButton = () => {
  const { handleDisconnect } = useAuth();

  return (
    <SignoutButton onClick={handleDisconnect} title={t('header.sign-out')} />
  );
};

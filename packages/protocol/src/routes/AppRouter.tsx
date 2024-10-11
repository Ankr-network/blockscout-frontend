import { OverlaySpinner } from '@ankr.com/ui';

import { Placeholder } from 'modules/common/components/Placeholder';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useInitialization } from 'hooks/useInitialization';

import { Routes } from './Routes';

export const AppRouter = () => {
  const { isLoggedIn, isLoggingIn } = useAuth();

  useInitialization(isLoggedIn);

  return (
    <Placeholder hasPlaceholder={isLoggingIn} placeholder={<OverlaySpinner />}>
      <Routes />
    </Placeholder>
  );
};

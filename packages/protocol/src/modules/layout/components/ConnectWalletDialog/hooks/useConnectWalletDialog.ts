import { selectIsWeb3UserWithEmailBound } from 'domains/auth/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { useSignUpDialog } from './useSignUpDialog';

export const useConnectWaletDialog = () => {
  const { hasOauthLogin } = useAuth();
  const isWeb3UserWithEmailBound = useAppSelector(
    selectIsWeb3UserWithEmailBound,
  );

  const { loading: isConnecting } = useAuth();

  const signUpDialog = useSignUpDialog();

  return {
    hasOauthLogin,
    isConnecting,
    isOpened: isWeb3UserWithEmailBound,
    signUpDialog,
  };
};

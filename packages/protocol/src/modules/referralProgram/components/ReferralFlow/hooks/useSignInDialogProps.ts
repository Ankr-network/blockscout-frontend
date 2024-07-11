import { useCallback, useMemo } from 'react';

import { ISignupDialogProps } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { getReferralCodeFromUrl } from 'modules/referralProgram/utils/getReferralCodeFromUrl';
import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyOauthSignoutQuery } from 'domains/oauth/actions/signout';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';

import { renderBackButton } from '../utils/renderBackButton';

export interface IUseSignInDialogProps {
  handleIneligibleAccountDialogOpen: () => void;
  handleSignInDialogClose: () => void;
  handleWelcomeDialogOpen: () => void;
  isSignInDialogOpened: boolean;
  setHasLoggedIn: (hasLoggedIn: boolean) => void;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
}

export const useSignInDialogProps = ({
  handleIneligibleAccountDialogOpen,
  handleSignInDialogClose,
  handleWelcomeDialogOpen,
  isSignInDialogOpened,
  setHasLoggedIn,
  setIsLoggingOut,
}: IUseSignInDialogProps) => {
  const isAccountEligible = useAppSelector(selectIsAccountEligible);

  const { handleSaveReferralCode } = useSavedReferralCode();

  const { referralCode } = getReferralCodeFromUrl();
  const { isLoggedIn } = useAuth();
  const [handleSignOut] = useLazyOauthSignoutQuery();

  const onOauthSignIn = useCallback(async () => {
    setIsLoggingOut(true);
    await handleSignOut();

    if (referralCode) {
      handleSaveReferralCode(referralCode);
    }
  }, [handleSaveReferralCode, handleSignOut, referralCode, setIsLoggingOut]);

  const onWeb3SignInSuccess = useCallback(
    () => setHasLoggedIn(true),
    [setHasLoggedIn],
  );

  const handlePreviousDialogOpen = useCallback(() => {
    if (isLoggedIn) {
      if (!isAccountEligible) {
        return handleIneligibleAccountDialogOpen();
      }
    }

    return handleWelcomeDialogOpen();
  }, [
    handleIneligibleAccountDialogOpen,
    handleWelcomeDialogOpen,
    isAccountEligible,
    isLoggedIn,
  ]);

  const signInDialogProps = useMemo(
    (): ISignupDialogProps => ({
      extraContent: renderBackButton({
        onClick: () => {
          handleSignInDialogClose();
          handlePreviousDialogOpen();
        },
      }),
      hasAutoAgreement: true,
      isOpen: isSignInDialogOpened,
      onClose: handleSignInDialogClose,
      onManualClose: handlePreviousDialogOpen,
      onOauthSignIn,
      onSuccess: onWeb3SignInSuccess,
    }),
    [
      handlePreviousDialogOpen,
      handleSignInDialogClose,
      isSignInDialogOpened,
      onOauthSignIn,
      onWeb3SignInSuccess,
    ],
  );

  return { signInDialogProps };
};

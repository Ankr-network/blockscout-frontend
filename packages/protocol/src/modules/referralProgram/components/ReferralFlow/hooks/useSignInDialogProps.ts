import { useCallback, useEffect, useMemo } from 'react';

import { EMilliSeconds } from 'modules/common/constants/const';
import { ISignupDialogProps } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { getReferralCodeFromUrl } from 'modules/referralProgram/utils/getReferralCodeFromUrl';
import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyOauthSignoutQuery } from 'domains/oauth/actions/signout';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { waitFor } from 'modules/common/utils/waitFor';

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
  const { hasWeb3Connection, isLoggedIn } = useAuth();
  const [handleSignOut] = useLazyOauthSignoutQuery();

  const onOauthSignIn = useCallback(async () => {
    setIsLoggingOut(true);

    await handleSignOut();

    // waiting for local storage synchronization after logging out
    await waitFor(EMilliSeconds.Second);

    if (referralCode) {
      handleSaveReferralCode(referralCode);
    }
  }, [handleSaveReferralCode, handleSignOut, referralCode, setIsLoggingOut]);

  const onWeb3Connect = useCallback(async () => {
    setIsLoggingOut(true);

    await handleSignOut();
  }, [handleSignOut, setIsLoggingOut]);

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
      canProcessReferralCode: true,
      extraContent: renderBackButton({
        onClick: () => {
          handleSignInDialogClose();
          handlePreviousDialogOpen();
        },
      }),
      isOpen: isSignInDialogOpened,
      isReferralCodeBoxDisabled: true,
      onClose: handleSignInDialogClose,
      onManualClose: handlePreviousDialogOpen,
      onOauthSignIn,
      onSuccess: onWeb3SignInSuccess,
      onWeb3Connect,
    }),
    [
      handlePreviousDialogOpen,
      handleSignInDialogClose,
      isSignInDialogOpened,
      onOauthSignIn,
      onWeb3Connect,
      onWeb3SignInSuccess,
    ],
  );

  useEffect(() => {
    if (hasWeb3Connection) {
      setIsLoggingOut(false);
    }
  }, [setIsLoggingOut, hasWeb3Connection]);

  return { signInDialogProps };
};

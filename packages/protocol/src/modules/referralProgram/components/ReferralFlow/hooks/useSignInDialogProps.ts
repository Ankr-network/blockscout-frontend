import { useCallback, useMemo } from 'react';

import { ISignupDialogProps } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { getReferralCodeFromUrl } from 'modules/referralProgram/utils/getReferralCodeFromUrl';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useApplyReferralCodeMutation } from 'modules/referralProgram/actions/applyReferralCode';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyOauthSignoutQuery } from 'domains/oauth/actions/signout';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';

import { renderBackButton } from '../utils/renderBackButton';

export interface IUseSignInDialogProps {
  handleSignInDialogClose: () => void;
  handleWelcomeDialogOpen: () => void;
  handleSuccessDialogOpen: () => void;
  handleIneligibleAccountDialogOpen: () => void;
  isSignInDialogOpened: boolean;
}

export const useSignInDialogProps = ({
  handleIneligibleAccountDialogOpen,
  handleSignInDialogClose,
  handleSuccessDialogOpen,
  handleWelcomeDialogOpen,
  isSignInDialogOpened,
}: IUseSignInDialogProps) => {
  const [applyReferralCode] = useApplyReferralCodeMutation();

  const isAccountEligible = useAppSelector(selectIsAccountEligible);

  const { handleSaveReferralCode } = useSavedReferralCode();

  const { referralCode } = getReferralCodeFromUrl();
  const { isLoggedIn } = useAuth();
  const [handleSignOut] = useLazyOauthSignoutQuery();

  const onOauthSignIn = useCallback(async () => {
    await handleSignOut();

    if (referralCode) {
      handleSaveReferralCode(referralCode);
    }
  }, [handleSaveReferralCode, handleSignOut, referralCode]);

  const onWeb3SignInSuccess = useCallback(async () => {
    if (referralCode) {
      if (isAccountEligible) {
        await applyReferralCode({ code: referralCode });

        handleSuccessDialogOpen();

        removeReferralCodeFromUrl();
      } else {
        handleIneligibleAccountDialogOpen();
      }
    }
  }, [
    applyReferralCode,
    handleIneligibleAccountDialogOpen,
    isAccountEligible,
    referralCode,
    handleSuccessDialogOpen,
  ]);

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
      isSignInDialogOpened,
      handleSignInDialogClose,
      handlePreviousDialogOpen,
      onOauthSignIn,
      onWeb3SignInSuccess,
    ],
  );

  return { signInDialogProps };
};

import { useCallback, useMemo } from 'react';

import { ISignupDialogProps } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { getReferralCodeFromUrl } from 'modules/referralProgram/utils/getReferralCodeFromUrl';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { selectIsAccountEligible } from 'modules/referralProgram/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useApplyReferralCodeMutation } from 'modules/referralProgram/actions/applyReferralCode';
import { useAuth } from 'domains/auth/hooks/useAuth';
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

  const onOauthSignIn = useCallback(() => {
    if (referralCode) {
      handleSaveReferralCode(referralCode);
    }
  }, [handleSaveReferralCode, referralCode]);

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

  const onClose = useCallback(() => {
    handleSignInDialogClose();

    if (isLoggedIn) {
      if (!isAccountEligible) {
        return handleIneligibleAccountDialogOpen();
      }
    }

    return handleWelcomeDialogOpen();
  }, [
    handleIneligibleAccountDialogOpen,
    handleSignInDialogClose,
    handleWelcomeDialogOpen,
    isAccountEligible,
    isLoggedIn,
  ]);

  const signInDialogProps = useMemo(
    (): ISignupDialogProps => ({
      extraContent: renderBackButton({ onClick: onClose }),
      hasAutoAgreement: true,
      isOpen: isSignInDialogOpened,
      onClose,
      onOauthSignIn,
      onSuccess: onWeb3SignInSuccess,
    }),
    [isSignInDialogOpened, onClose, onOauthSignIn, onWeb3SignInSuccess],
  );

  return { signInDialogProps };
};

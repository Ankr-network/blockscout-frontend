import { useCallback, useMemo } from 'react';

import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useReferralCode } from 'modules/referralProgram/hooks/useReferralCode';

import { IWelcomeDialogProps } from '../WelcomeDialog';

export interface IUseWelcomeDialogProps {
  handlSignInDialogOpen: () => void;
}

export const useWelcomeDialog = ({
  handlSignInDialogOpen,
}: IUseWelcomeDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleWelcomeDialogOpen,
  } = useDialog();

  const { referralCode } = useReferralCode();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();

    handleClose();
  }, [handleClose]);

  const onSignInButtonClick = useCallback(() => {
    handlSignInDialogOpen();

    handleClose();
  }, [handlSignInDialogOpen, handleClose]);

  const welcomeDialogProps = useMemo(
    (): IWelcomeDialogProps => ({
      onClose,
      onSignInButtonClick,
      open: isOpened,
      referralCode,
    }),
    [isOpened, onClose, onSignInButtonClick, referralCode],
  );

  return { handleWelcomeDialogOpen, welcomeDialogProps };
};

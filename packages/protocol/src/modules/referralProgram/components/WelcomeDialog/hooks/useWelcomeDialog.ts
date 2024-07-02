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
  const { isOpened, onClose, onOpen: handleWelcomeDialogOpen } = useDialog();

  const { referralCode } = useReferralCode();

  const onCancelButtonClick = useCallback(() => {
    removeReferralCodeFromUrl();

    onClose();
  }, [onClose]);

  const onSignInButtonClick = useCallback(() => {
    handlSignInDialogOpen();

    onClose();
  }, [handlSignInDialogOpen, onClose]);

  const welcomeDialogProps = useMemo(
    (): IWelcomeDialogProps => ({
      onCancelButtonClick,
      onClose: onCancelButtonClick,
      onSignInButtonClick,
      open: isOpened,
      referralCode,
    }),
    [isOpened, onCancelButtonClick, onSignInButtonClick, referralCode],
  );

  return { handleWelcomeDialogOpen, welcomeDialogProps };
};

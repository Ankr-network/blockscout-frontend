import { useCallback, useMemo } from 'react';

import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useReferralCode } from 'modules/referralProgram/hooks/useReferralCode';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';

import { IIneligibleAccountDialogProps } from '../IneligibleAccountDialog';

export interface IUseIneligibleAccountDialogProps {
  handleSignInDialogOpen: () => void;
}

export const useIneligibleAccountDialog = ({
  handleSignInDialogOpen,
}: IUseIneligibleAccountDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleIneligibleAccountDialogOpen,
  } = useDialog();

  const { referralCode: referralCodeFromUrl } = useReferralCode();
  const { handleRemoveSavedReferralCode, savedReferralCode } =
    useSavedReferralCode();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();
    handleRemoveSavedReferralCode();

    handleClose();
  }, [handleClose, handleRemoveSavedReferralCode]);

  const onSignInButtonClick = useCallback(() => {
    handleSignInDialogOpen();

    handleClose();
  }, [handleClose, handleSignInDialogOpen]);

  const referralCode = referralCodeFromUrl || savedReferralCode;

  const ineligibleAccountDialogProps = useMemo(
    (): IIneligibleAccountDialogProps => ({
      onClose,
      onSignInButtonClick,
      open: isOpened,
      referralCode,
    }),
    [isOpened, onClose, onSignInButtonClick, referralCode],
  );

  return { handleIneligibleAccountDialogOpen, ineligibleAccountDialogProps };
};

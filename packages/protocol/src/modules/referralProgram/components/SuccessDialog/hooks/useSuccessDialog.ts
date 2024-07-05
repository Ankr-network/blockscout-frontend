import { useCallback, useMemo } from 'react';

import { getReferralCode } from 'modules/referralProgram/utils/getReferralCode';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';

import { ISuccessDialogProps } from '../SuccessDialog';

export const useSuccessDialog = () => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleSuccessDialogOpen,
  } = useDialog();

  const { referralCode: referralCodeFromUrl } = getReferralCode();
  const { savedReferralCode } = useSavedReferralCode();
  const { handleRemoveSavedReferralCode } = useSavedReferralCode();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();

    handleRemoveSavedReferralCode();

    handleClose();
  }, [handleClose, handleRemoveSavedReferralCode]);

  const referralCode = referralCodeFromUrl || savedReferralCode;

  const successDialogProps = useMemo(
    (): ISuccessDialogProps => ({
      onDoneButtonClick: onClose,
      onClose,
      open: isOpened,
      referralCode,
    }),
    [isOpened, onClose, referralCode],
  );

  return { handleSuccessDialogOpen, successDialogProps };
};

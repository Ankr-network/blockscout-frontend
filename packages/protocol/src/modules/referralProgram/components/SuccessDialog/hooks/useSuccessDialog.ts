import { useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useReferralCode } from 'modules/referralProgram/hooks/useReferralCode';

import { ISuccessDialogProps } from '../SuccessDialog';

export const useSuccessDialog = () => {
  const { isOpened, onClose, onOpen: handleSuccessDialogOpen } = useDialog();

  const { referralCode } = useReferralCode();

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

import { useCallback, useMemo } from 'react';

import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useRedirectToBilling } from 'modules/referralProgram/hooks/useRedirectToBilling';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';

import { ISuccessDialogProps } from '../SuccessDialog';

export interface IUseSuccessDialogProps {
  banner: string | undefined;
  blockchainName: string | undefined;
}

export const useSuccessDialog = ({
  banner,
  blockchainName,
}: IUseSuccessDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleSuccessDialogOpen,
  } = useDialog();

  const { redirectToBilling } = useRedirectToBilling();

  const { handleRemoveSavedReferralCode } = useSavedReferralCode();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();

    handleRemoveSavedReferralCode();

    handleClose();

    redirectToBilling();
  }, [handleClose, handleRemoveSavedReferralCode, redirectToBilling]);

  const successDialogProps = useMemo(
    (): ISuccessDialogProps => ({
      banner,
      blockchainName,
      onClose,
      onDoneButtonClick: onClose,
      open: isOpened,
    }),
    [banner, blockchainName, isOpened, onClose],
  );

  return { handleSuccessDialogOpen, successDialogProps };
};

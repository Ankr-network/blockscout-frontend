import { useCallback, useMemo } from 'react';

import { useApplyReferralCode } from 'modules/referralProgram/hooks/useApplyReferralCode';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useImagePreloader } from 'modules/common/hooks/useImagePreloader';

import { IReferralCodeDialogProps } from '../ReferralCodeDialog';
import { IReferralCodeInputProps } from '../../ReferralCodeInput';

export interface IUseReferralCodeDialogProps {
  appliedReferralCode?: string;
  banner: string;
  handleReset: () => void;
  handleSuccessDialogOpen: () => void;
  referralCodeInputProps: IReferralCodeInputProps;
}

export const useReferralCodeDialog = ({
  appliedReferralCode,
  banner,
  handleReset,
  handleSuccessDialogOpen,
  referralCodeInputProps,
}: IUseReferralCodeDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleReferralCodeDialogOpen,
  } = useDialog();

  const { value: referralCode } = referralCodeInputProps;

  const { handleImagePreload } = useImagePreloader({
    hasManualPreloading: true,
    src: banner,
  });

  const onApplyReferralCodeSuccess = useCallback(async () => {
    if (referralCode) {
      handleClose();
      await handleImagePreload();
      handleSuccessDialogOpen();
    }
  }, [handleClose, handleImagePreload, handleSuccessDialogOpen, referralCode]);

  const { handleApplyReferralCode, isApplying } = useApplyReferralCode({
    hasSuccessNotification: false,
    onSuccess: onApplyReferralCodeSuccess,
    referralCode,
    shouldRemoveSavedData: false,
  });

  const onClose = useCallback(() => {
    handleClose();
    handleReset();
  }, [handleReset, handleClose]);

  const isApplyButtonDisabled = Boolean(
    appliedReferralCode && referralCode && appliedReferralCode === referralCode,
  );

  const referralCodeDialogProps = useMemo(
    (): IReferralCodeDialogProps => ({
      isApplyButtonDisabled,
      isApplying,
      onApplyButtonClick: handleApplyReferralCode,
      onCancelButtonClick: onClose,
      onClose,
      open: isOpened,
      referralCodeInputProps,
    }),
    [
      handleApplyReferralCode,
      isApplyButtonDisabled,
      isApplying,
      isOpened,
      onClose,
      referralCodeInputProps,
    ],
  );

  return { handleReferralCodeDialogOpen, referralCodeDialogProps };
};

import { useCallback, useMemo } from 'react';

import { isAlphanumeric } from 'modules/common/utils/isAlphanumeric';
import { useApplyReferralCode } from 'modules/referralProgram/hooks/useApplyReferralCode';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useImagePreloader } from 'modules/common/hooks/useImagePreloader';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { IReferralCodeDialogProps } from '../ReferralCodeDialog';
import { IReferralCodeInputProps } from '../../ReferralCodeInput';
import { referralCodeDialogTranslation } from '../translation';

export interface IUseReferralCodeDialogProps {
  appliedReferralCode?: string;
  banner: string;
  handleReset: () => void;
  handleSuccessDialogOpen: () => void;
  referralCodeInputProps: IReferralCodeInputProps;
  setReferralCodeError: (error?: string) => void;
}

export const useReferralCodeDialog = ({
  appliedReferralCode,
  banner,
  handleReset,
  handleSuccessDialogOpen,
  referralCodeInputProps,
  setReferralCodeError,
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

  const { handleApplyReferralCode: applyReferralCode, isApplying } =
    useApplyReferralCode({
      hasSuccessNotification: false,
      onSuccess: onApplyReferralCodeSuccess,
      referralCode,
      shouldRemoveSavedData: false,
    });

  const { keys, t } = useTranslation(referralCodeDialogTranslation);

  const handleApplyReferralCode = useCallback(async () => {
    if (referralCode) {
      if (isAlphanumeric(referralCode)) {
        setReferralCodeError(t(keys.invalidReferralCode));
      } else {
        await applyReferralCode();
      }
    }
  }, [applyReferralCode, keys, referralCode, setReferralCodeError, t]);

  const onClose = useCallback(() => {
    handleClose();
    handleReset();
    setReferralCodeError(undefined);
  }, [handleReset, handleClose, setReferralCodeError]);

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

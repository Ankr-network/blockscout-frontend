import { useCallback, useMemo } from 'react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { blockchainNamesMap } from 'modules/referralProgram/const';
import { getReferralCode } from 'modules/referralProgram/utils/getReferralCode';
import { referralProgramTranslation } from 'modules/referralProgram/translation';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useAppDispatch } from 'store/useAppDispatch';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ISwitchAccountDialogProps } from '../SwitchAccountDialog';
import { useSelectPersonalAccount } from './useSelectPersonalAccount';

const { showNotification } = NotificationActions;

export const useSwitchAccountDialog = () => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleSwitchAccountDialogOpen,
  } = useDialog();

  const { referralCode: referralCodeFromUrl } = getReferralCode();
  const { handleRemoveSavedReferralCode, savedReferralCode } =
    useSavedReferralCode();

  const referralCode = referralCodeFromUrl || savedReferralCode;
  const blockchainName = referralCode
    ? blockchainNamesMap[referralCode]
    : undefined;

  const { keys, t } = useTranslation(referralProgramTranslation);

  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();
    handleRemoveSavedReferralCode();

    handleClose();

    dispatch(
      showNotification({
        message: t(keys.activationRejectedErrorMessage),
        severity: 'error',
        title: t(keys.activationRejectedErrorTitle, { blockchainName }),
      }),
    );
  }, [
    blockchainName,
    dispatch,
    handleClose,
    handleRemoveSavedReferralCode,
    keys,
    t,
  ]);

  const { handleSelectPersonalAccount, isPersonalAccountSelecting } =
    useSelectPersonalAccount();

  const onSwitchButtonClick = useCallback(async () => {
    await handleSelectPersonalAccount();

    handleClose();
  }, [handleClose, handleSelectPersonalAccount]);

  const switchAccountDialogProps = useMemo(
    (): ISwitchAccountDialogProps => ({
      blockchainName,
      onClose,
      onSwitchButtonClick,
      open: isOpened,
      referralCode,
      isSwitching: isPersonalAccountSelecting,
    }),
    [
      blockchainName,
      isOpened,
      isPersonalAccountSelecting,
      onClose,
      onSwitchButtonClick,
      referralCode,
    ],
  );

  return { handleSwitchAccountDialogOpen, switchAccountDialogProps };
};

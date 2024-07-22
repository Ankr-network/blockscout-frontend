import { useCallback, useMemo } from 'react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { referralProgramTranslation } from 'modules/referralProgram/translation';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useAppDispatch } from 'store/useAppDispatch';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ISwitchAccountDialogProps } from '../SwitchAccountDialog';
import { useSelectPersonalAccount } from './useSelectPersonalAccount';

const { showNotification } = NotificationActions;

export interface IUseSwitchAccountDialogProps {
  banner: string | undefined;
  blockchainName: string | undefined;
}

export const useSwitchAccountDialog = ({
  banner,
  blockchainName,
}: IUseSwitchAccountDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleSwitchAccountDialogOpen,
  } = useDialog();

  const { handleRemoveSavedReferralCode } = useSavedReferralCode();

  const {
    keys: { branded, unbranded },
    t,
  } = useTranslation(referralProgramTranslation);
  const keys = blockchainName ? branded : unbranded;

  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();
    handleRemoveSavedReferralCode();

    handleClose();

    dispatch(
      showNotification({
        message: t(keys.activationRejectedErrorMessage),
        severity: 'error',
        title: t(keys.activationRejectedErrorTitle, {
          blockchainName,
          isBranded: Boolean(blockchainName),
        }),
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
      banner,
      blockchainName,
      onClose,
      onSwitchButtonClick,
      open: isOpened,
      isSwitching: isPersonalAccountSelecting,
    }),
    [
      banner,
      blockchainName,
      isOpened,
      isPersonalAccountSelecting,
      onClose,
      onSwitchButtonClick,
    ],
  );

  return { handleSwitchAccountDialogOpen, switchAccountDialogProps };
};

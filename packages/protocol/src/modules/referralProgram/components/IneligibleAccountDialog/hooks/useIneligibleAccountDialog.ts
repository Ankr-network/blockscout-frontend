import { useCallback, useMemo } from 'react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { referralProgramTranslation } from 'modules/referralProgram/translation';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useAppDispatch } from 'store/useAppDispatch';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { IIneligibleAccountDialogProps } from '../IneligibleAccountDialog';

const { showNotification } = NotificationActions;

export interface IUseIneligibleAccountDialogProps {
  banner: string | undefined;
  blockchainName: string | undefined;
  handleSignInDialogOpen: () => void;
}

export const useIneligibleAccountDialog = ({
  banner,
  blockchainName,
  handleSignInDialogOpen,
}: IUseIneligibleAccountDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleIneligibleAccountDialogOpen,
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

  const onSignInButtonClick = useCallback(() => {
    handleSignInDialogOpen();

    handleClose();
  }, [handleClose, handleSignInDialogOpen]);

  const ineligibleAccountDialogProps = useMemo(
    (): IIneligibleAccountDialogProps => ({
      blockchainName,
      onClose,
      onSignInButtonClick,
      open: isOpened,
      banner,
    }),
    [banner, blockchainName, isOpened, onClose, onSignInButtonClick],
  );

  return { handleIneligibleAccountDialogOpen, ineligibleAccountDialogProps };
};

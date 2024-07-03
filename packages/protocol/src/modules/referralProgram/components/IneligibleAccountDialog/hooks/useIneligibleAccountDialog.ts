import { useCallback, useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useReferralCode } from 'modules/referralProgram/hooks/useReferralCode';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';

import { IIneligibleAccountDialogProps } from '../IneligibleAccountDialog';

export interface IUseIneligibleAccountDialogProps {
  handlSignInDialogOpen: () => void;
}

export const useIneligibleAccountDialog = ({
  handlSignInDialogOpen,
}: IUseIneligibleAccountDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleIneligibleAccountDialogOpen,
  } = useDialog();

  const { referralCode } = useReferralCode();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();

    handleClose();
  }, [handleClose]);

  const onSignInButtonClick = useCallback(() => {
    handlSignInDialogOpen();

    handleClose();
  }, [handleClose, handlSignInDialogOpen]);

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

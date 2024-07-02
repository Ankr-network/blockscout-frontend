import { useCallback, useMemo } from 'react';

import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useReferralCode } from 'modules/referralProgram/hooks/useReferralCode';

import { IWelcomeDialogB2BProps } from '../WelcomeDialogB2B';
import { blockchainNamesMap, topBannersMap } from '../const';

export interface IUseWelcomeDialogB2B {
  handlSignInDialogOpen: () => void;
}

export const useWelcomeDialogB2B = ({
  handlSignInDialogOpen,
}: IUseWelcomeDialogB2B) => {
  const { isOpened, onClose, onOpen: handleWelcomeDialogB2BOpen } = useDialog();

  const { referralCode } = useReferralCode();

  const onCancelButtonClick = useCallback(() => {
    removeReferralCodeFromUrl();

    onClose();
  }, [onClose]);

  const onSignInButtonClick = useCallback(() => {
    handlSignInDialogOpen();

    onClose();
  }, [handlSignInDialogOpen, onClose]);

  const welcomeDialogB2BProps = useMemo(
    (): IWelcomeDialogB2BProps => ({
      blockchainName: referralCode
        ? blockchainNamesMap[referralCode]
        : undefined,
      onCancelButtonClick,
      onClose: onCancelButtonClick,
      onSignInButtonClick,
      open: isOpened,
      topBannerUrl: referralCode ? topBannersMap[referralCode] : undefined,
    }),
    [isOpened, onCancelButtonClick, onSignInButtonClick, referralCode],
  );

  return { handleWelcomeDialogB2BOpen, welcomeDialogB2BProps };
};

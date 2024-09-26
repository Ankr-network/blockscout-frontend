import { ButtonTypeMap } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';

import { LoadableButton } from 'uiKit/LoadableButton';
import { timeout } from 'modules/common/utils/timeout';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { trackSignUpModalOpen } from 'modules/analytics/mixpanel/trackSignUpModalOpen';

import { useStyles } from '../useStyles';
import { SignupDialog } from './SignupDialog';

interface UnconnectedButtonProps {
  buttonText?: string;
  className?: string;
  onOpen?: () => void;
  onSuccess?: () => void;
  variant?: ButtonTypeMap['props']['variant'];
}

export const UnconnectedButton = ({
  buttonText,
  className,
  onOpen = () => {},
  onSuccess,
  variant = 'text',
}: UnconnectedButtonProps) => {
  const { classes, cx } = useStyles(false);
  const { hasOauthLogin, loading } = useAuth();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleClose = useCallback(async () => {
    setIsOpened(false);

    await timeout(300);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpened(true);

    onOpen();

    trackSignUpModalOpen();
  }, [onOpen]);

  const handleSuccess = useCallback(() => {
    setIsOpened(false);

    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  }, [onSuccess]);

  return (
    <>
      <LoadableButton
        className={cx(classes.button, className)}
        color="primary"
        disableElevation={false}
        disabled={loading}
        loading={loading}
        onClick={handleOpen}
        variant={variant}
      >
        {buttonText || t('header.wallet-button')}
      </LoadableButton>

      <SignupDialog
        canProcessReferralCode
        hasOauthLogin={hasOauthLogin}
        isOpen={isOpened}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </>
  );
};

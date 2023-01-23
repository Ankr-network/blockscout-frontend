import { ButtonTypeMap } from '@mui/material';
import { t } from '@ankr.com/common';
import { useCallback, useState } from 'react';

import { LoadableButton } from 'uiKit/LoadableButton';
import { SignupDialog } from './SignupDialog';
import { timeout } from 'modules/common/utils/timeout';
import { trackSignUpFailure } from 'modules/analytics/mixpanel/trackSignUpFailure';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useStyles } from '../useStyles';

interface UnconnectedButtonProps {
  buttonText?: string;
  className?: string;
  onSuccess?: () => void;
  variant?: ButtonTypeMap['props']['variant'];
}

export const UnconnectedButton = ({
  buttonText,
  className,
  onSuccess,
  variant = 'text',
}: UnconnectedButtonProps) => {
  const { classes, cx } = useStyles(false);
  const { loading, hasOauthLogin } = useAuth();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleClose = useCallback(async () => {
    setIsOpened(false);

    await timeout(300);
  }, []);

  const onManualClose = useCallback(async () => {
    await handleClose();

    trackSignUpFailure();
  }, [handleClose]);

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
        onClick={() => setIsOpened(true)}
        variant={variant}
      >
        {buttonText || t('header.wallet-button')}
      </LoadableButton>

      <SignupDialog
        hasOauthLogin={hasOauthLogin}
        isOpen={isOpened}
        onClose={handleClose}
        onManualClose={onManualClose}
        onSuccess={handleSuccess}
      />
    </>
  );
};

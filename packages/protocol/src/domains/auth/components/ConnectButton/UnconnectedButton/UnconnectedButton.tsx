import { useCallback, useState } from 'react';
import { ButtonTypeMap } from '@material-ui/core';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useStyles } from '../useStyles';
import { LoadableButton } from 'uiKit/LoadableButton';
import { SignupDialog } from './SignupDialog';
import { timeout } from 'modules/common/utils/timeout';

interface UnconnectedButtonProps {
  variant?: ButtonTypeMap['props']['variant'];
  buttonText?: string;
  onSuccess?: () => void;
  className?: string;
}

export const UnconnectedButton = ({
  variant = 'text',
  buttonText,
  onSuccess,
  className,
}: UnconnectedButtonProps) => {
  const classes = useStyles({});
  const { loading, hasOauthLogin } = useAuth();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleClose = useCallback(async () => {
    setIsOpened(false);

    await timeout(300);
  }, []);

  const handleSuccess = useCallback(() => {
    setIsOpened(false);

    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  }, [onSuccess]);

  return (
    <>
      <LoadableButton
        variant={variant}
        color="primary"
        className={classNames(classes.button, className)}
        disableElevation={false}
        onClick={() => setIsOpened(true)}
        disabled={loading}
        loading={loading}
      >
        {buttonText || t('header.wallet-button')}
      </LoadableButton>

      <SignupDialog
        isOpen={isOpened}
        onClose={handleClose}
        onSuccess={handleSuccess}
        hasOauthLogin={hasOauthLogin}
      />
    </>
  );
};

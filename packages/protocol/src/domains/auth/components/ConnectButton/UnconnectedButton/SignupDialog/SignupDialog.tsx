import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ConnectWalletsContent } from './ConnectWalletsContent';
import { Dialog } from 'uiKit/Dialog';
import { EmailContent } from './EmailContent';
import { EmailContentLoading } from './EmailContentLoading';
import { useOauthLoginParams } from 'domains/oauth/hooks/useOauthLoginParams';

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onManualClose?: () => void;
  onSuccess?: () => void;
  hasOauthLogin?: boolean;
}

export const SignupDialog = ({
  isOpen = false,
  onClose,
  onManualClose = onClose,
  onSuccess,
  hasOauthLogin,
}: SignupDialogProps) => {
  const { handleFetchLoginParams, loading } = useOauthLoginParams();

  const dialogTitle = useMemo(() => {
    if (loading) return '';

    if (hasOauthLogin) return t('signup-modal.connect-wallet');

    return t('signup-modal.title');
  }, [loading, hasOauthLogin]);

  return (
    <Dialog
      maxPxWidth={618}
      onClose={onManualClose}
      open={isOpen}
      title={dialogTitle}
    >
      {loading ? (
        <EmailContentLoading />
      ) : (
        <>
          <ConnectWalletsContent onClose={onClose} onSuccess={onSuccess} />
          {!hasOauthLogin && <EmailContent onClick={handleFetchLoginParams} />}
        </>
      )}
    </Dialog>
  );
};

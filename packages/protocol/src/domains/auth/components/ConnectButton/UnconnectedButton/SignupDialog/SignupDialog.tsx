import { useOauthLoginParams } from 'domains/oauth/hooks/useOauthLoginParams';
import { t } from 'modules/i18n/utils/intl';
import { useMemo } from 'react';
import { Dialog } from 'uiKit/Dialog';
import { ConnectWalletsContent } from './ConnectWalletsContent';
import { EmailContent } from './EmailContent';
import { EmailContentLoading } from './EmailContentLoading';

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  hasOauthLogin?: boolean;
}

export const SignupDialog = ({
  isOpen = false,
  onClose,
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
      open={isOpen}
      onClose={onClose}
      maxPxWidth={618}
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

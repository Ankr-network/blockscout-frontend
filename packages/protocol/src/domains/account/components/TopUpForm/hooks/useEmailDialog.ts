import { useDialog } from 'modules/common/hooks/useDialog';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';

export const useEmailDialog = () => {
  const emailData = useEmailData();
  const { confirmedEmail, pendingEmail } = emailData;

  const hasEmailBound = Boolean(confirmedEmail || pendingEmail);

  const dialogProps = useDialog();
  const { onOpen: handleOpenEmailDialog } = dialogProps;

  return { dialogProps, emailData, handleOpenEmailDialog, hasEmailBound };
};

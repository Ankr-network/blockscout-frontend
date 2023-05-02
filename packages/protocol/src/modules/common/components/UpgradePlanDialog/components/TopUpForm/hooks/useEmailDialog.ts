import { useCallback, useMemo, useState } from 'react';

import { TopUpEmailDialogProps } from 'domains/account/components/TopUp/ANKRTopUpForm/TopUpEmailDialog';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';

export interface EmailDialog {
  close: () => void;
  emailDialogProps: TopUpEmailDialogProps;
  isOpened: boolean;
  open: () => void;
  shouldBeOpened: boolean;
}

export const useEmailDialog = (): EmailDialog => {
  const [isOpened, setOpened] = useState(false);

  const emailDataProps = useEmailData();

  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);

  const { confirmedEmail, pendingEmail } = emailDataProps;
  const shouldBeOpened = Boolean(!confirmedEmail || pendingEmail);

  return useMemo(
    () => ({
      close,
      isOpened,
      open,
      shouldBeOpened,
      emailDialogProps: {
        emailDataProps,
        dialogProps: {
          isOpened,
          onClose: close,
        },
      },
    }),
    [close, emailDataProps, isOpened, open, shouldBeOpened],
  );
};

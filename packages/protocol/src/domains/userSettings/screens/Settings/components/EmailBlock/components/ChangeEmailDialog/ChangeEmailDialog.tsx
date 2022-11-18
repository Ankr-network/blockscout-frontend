import { ReactNode, useMemo } from 'react';

import { t } from '@ankr.com/common';
import { AddEmailForm } from 'domains/userSettings/components/AddEmailForm';
import { AddEmailFormContentState } from 'domains/userSettings/components/AddEmailForm/types';
import { Dialog } from 'uiKit/Dialog';
import { SuccessStep } from './components/SuccessStep';
import { useChangeEmailDialog } from './useChangeEmailDialog';

interface IChangeEmailDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ChangeEmailDialog = ({
  open,
  onClose,
}: IChangeEmailDialogProps) => {
  const { contentState, email, formProps } = useChangeEmailDialog();

  const form = useMemo(() => <AddEmailForm {...formProps} />, [formProps]);

  const content = useMemo<Partial<Record<AddEmailFormContentState, ReactNode>>>(
    () => ({
      [AddEmailFormContentState.ADD_EMAIL]: form,
      [AddEmailFormContentState.SUCCESS]: (
        <SuccessStep email={email}>{form}</SuccessStep>
      ),
    }),
    [email, form],
  );

  return (
    <Dialog
      title={t('user-settings.change-email-dialog.title')}
      open={open}
      onClose={onClose}
      maxPxWidth={618}
    >
      {content[contentState]}
    </Dialog>
  );
};

import { ReactNode, useMemo } from 'react';
import { t } from '@ankr.com/common';

import { AddEmailForm } from 'domains/userSettings/components/AddEmailForm';
import { AddEmailFormContentState } from 'domains/userSettings/components/AddEmailForm/types';
import { Dialog } from 'uiKit/Dialog';

import { SuccessStep } from './components/SuccessStep';
import { useChangeEmailDialog } from './useChangeEmailDialog';
import { useChangeEmailDialogStyles } from './useChangeEmailDialogStyles';

interface IChangeEmailDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ChangeEmailDialog = ({
  onClose,
  open,
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

  const { classes } = useChangeEmailDialogStyles();

  return (
    <Dialog
      fullWidth
      maxPxWidth={618}
      onClose={onClose}
      open={open}
      title={t('user-settings.change-email-dialog.title')}
      titleClassName={classes.title}
    >
      {content[contentState]}
    </Dialog>
  );
};

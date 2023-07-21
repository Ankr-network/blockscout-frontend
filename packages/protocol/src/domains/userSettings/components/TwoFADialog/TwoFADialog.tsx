import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import { useTwoFADialog } from 'domains/userSettings/screens/Settings/hooks/useTwoFADialog';

import { USER_SETTINGS_INTL_ROOT } from '../../screens/Settings/components/TwoFABlock/constants';
import { TwoFAInput } from './components/TwoFAInput';
import { useTwoFADialogStyles } from './TwoFADialogStyles';

export const TwoFADialog = () => {
  const {
    isOpened,
    handleClose,
    handleSetTwoFACode,
    errorMessage,
    handleResetErroMessage,
  } = useTwoFADialog();
  const { classes } = useTwoFADialogStyles();

  return (
    <Dialog
      maxPxWidth={600}
      open={isOpened}
      onClose={handleClose}
      title={
        <span className={classes.title}>
          {t(`${USER_SETTINGS_INTL_ROOT}.enter-code-dialog.title`)}
        </span>
      }
    >
      <TwoFAInput
        buttonText={t(`${USER_SETTINGS_INTL_ROOT}.enter-code-dialog.button`)}
        onConfirm={handleSetTwoFACode}
        errorMessage={errorMessage}
        onReset={handleResetErroMessage}
      />
    </Dialog>
  );
};

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { Buttons, IButtonsProps } from './components/Buttons';
import {
  IReferralCodeInputProps,
  ReferralCodeInput,
} from '../ReferralCodeInput';
import { referralCodeDialogTranslation } from './translation';
import { useReferralCodeDialogStyles } from './useReferralCodeDialogStyles';

export interface IReferralCodeDialogProps extends IDialogProps, IButtonsProps {
  referralCodeInputProps: IReferralCodeInputProps;
}

export const ReferralCodeDialog = ({
  isApplyButtonDisabled,
  isApplying,
  onApplyButtonClick,
  onCancelButtonClick,
  referralCodeInputProps,
  ...dialogProps
}: IReferralCodeDialogProps) => {
  const { keys, t } = useTranslation(referralCodeDialogTranslation);
  const { classes } = useReferralCodeDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      dialogContentClassName={classes.content}
      title={t(keys.title)}
      titleClassName={classes.title}
    >
      <ReferralCodeInput {...referralCodeInputProps} />
      <Buttons
        isApplyButtonDisabled={isApplyButtonDisabled}
        isApplying={isApplying}
        onApplyButtonClick={onApplyButtonClick}
        onCancelButtonClick={onCancelButtonClick}
      />
    </Dialog>
  );
};

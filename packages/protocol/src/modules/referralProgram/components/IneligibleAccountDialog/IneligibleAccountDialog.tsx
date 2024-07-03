import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { Buttons } from './components/Buttons';
import {
  IReferralFlowDialogProps,
  ReferralFlowDialog,
} from '../ReferralFlowDialog';
import { ineligibleAccountDialogTranslation } from './translation';
import { useIneligibleAccountDialogStyles } from './useIneligibleAccountDialogStyles';

export interface IIneligibleAccountDialogProps
  extends IReferralFlowDialogProps {
  onSignInButtonClick: () => void;
}

export const IneligibleAccountDialog = ({
  onSignInButtonClick,
  ...dialogProps
}: IIneligibleAccountDialogProps) => {
  const { onClose } = dialogProps;

  const { keys, t } = useTranslation(ineligibleAccountDialogTranslation);

  const { classes } = useIneligibleAccountDialogStyles();

  return (
    <ReferralFlowDialog {...dialogProps}>
      <div className={classes.content}>
        <Typography variant="h6">{t(keys.title)}</Typography>
        <Typography variant="body2">{t(keys.description)}</Typography>
      </div>
      <Buttons
        onCancelButtonClick={onClose}
        onSignInButtonClick={onSignInButtonClick}
      />
    </ReferralFlowDialog>
  );
};

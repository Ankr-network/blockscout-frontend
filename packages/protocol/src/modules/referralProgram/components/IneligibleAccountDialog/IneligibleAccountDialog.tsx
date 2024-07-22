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
  blockchainName: string | undefined;
  onSignInButtonClick: () => void;
}

export const IneligibleAccountDialog = ({
  blockchainName,
  onSignInButtonClick,
  ...dialogProps
}: IIneligibleAccountDialogProps) => {
  const { onClose } = dialogProps;

  const {
    keys: { branded, unbranded },
    t,
  } = useTranslation(ineligibleAccountDialogTranslation);

  const keys = blockchainName ? branded : unbranded;

  const { classes } = useIneligibleAccountDialogStyles();

  return (
    <ReferralFlowDialog {...dialogProps}>
      <div className={classes.content}>
        <Typography variant="h6">
          {t(keys.title, { blockchainName })}
        </Typography>
        <Typography variant="body2">{t(keys.description)}</Typography>
      </div>
      <Buttons
        onCancelButtonClick={onClose}
        onSignInButtonClick={onSignInButtonClick}
      />
    </ReferralFlowDialog>
  );
};

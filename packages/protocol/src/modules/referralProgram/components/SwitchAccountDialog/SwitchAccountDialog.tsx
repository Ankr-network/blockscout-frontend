import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { Buttons } from './components/Buttons';
import {
  IReferralFlowDialogProps,
  ReferralFlowDialog,
} from '../ReferralFlowDialog';
import { switchAccountDialogTranslation } from './translation';
import { useSwitchAccountDialogStyles } from './useSwitchAccountDialogStyles';

export interface ISwitchAccountDialogProps extends IReferralFlowDialogProps {
  blockchainName: string | undefined;
  isSwitching: boolean;
  onSwitchButtonClick: () => void;
}

export const SwitchAccountDialog = ({
  blockchainName,
  isSwitching,
  onSwitchButtonClick,
  ...dialogProps
}: ISwitchAccountDialogProps) => {
  const { onClose } = dialogProps;

  const {
    keys: { branded, unbranded },
    t,
  } = useTranslation(switchAccountDialogTranslation);

  const keys = blockchainName ? branded : unbranded;

  const { classes } = useSwitchAccountDialogStyles();

  return (
    <ReferralFlowDialog {...dialogProps}>
      <div className={classes.content}>
        <Typography variant="h6">
          {t(keys.title, { blockchainName })}
        </Typography>
        <Typography variant="body2">{t(keys.description)}</Typography>
      </div>
      <Buttons
        isSwitching={isSwitching}
        onCancelButtonClick={onClose}
        onSwitchButtonClick={onSwitchButtonClick}
      />
    </ReferralFlowDialog>
  );
};

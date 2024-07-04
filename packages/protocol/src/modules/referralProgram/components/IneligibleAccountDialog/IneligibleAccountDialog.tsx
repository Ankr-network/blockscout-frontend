import { Typography } from '@mui/material';

import { blockchainNamesMap } from 'modules/referralProgram/const';
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
  const { onClose, referralCode } = dialogProps;

  const blockchainName = referralCode
    ? blockchainNamesMap[referralCode]
    : undefined;

  const { keys, t } = useTranslation(ineligibleAccountDialogTranslation);

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

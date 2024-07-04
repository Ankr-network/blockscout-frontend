import { Button, Typography } from '@mui/material';

import { blockchainNamesMap } from 'modules/referralProgram/const';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { Benefits } from '../Benefits';
import {
  IReferralFlowDialogProps,
  ReferralFlowDialog,
} from '../ReferralFlowDialog';
import { successDialogTranslation } from './translation';
import { useSuccessDialogStyles } from './useSuccessDialogStyles';

export interface ISuccessDialogProps extends IReferralFlowDialogProps {
  onDoneButtonClick: () => void;
}

export const SuccessDialog = ({
  onDoneButtonClick,
  ...dialogProps
}: ISuccessDialogProps) => {
  const { referralCode } = dialogProps;

  const blockchainName = referralCode
    ? blockchainNamesMap[referralCode]
    : undefined;

  const { keys, t, tHTML } = useTranslation(successDialogTranslation);

  const { classes } = useSuccessDialogStyles();

  return (
    <ReferralFlowDialog {...dialogProps}>
      <div className={classes.content}>
        <Typography variant="h6">
          {t(keys.title, { blockchainName })}
        </Typography>
        <Typography variant="body2">
          {tHTML(keys.description, { blockchainName })}
        </Typography>
        <Benefits blockchainName={blockchainName} />
      </div>
      <Button
        color="primary"
        onClick={onDoneButtonClick}
        size="large"
        variant="contained"
      >
        {t(keys.doneButton)}
      </Button>
    </ReferralFlowDialog>
  );
};

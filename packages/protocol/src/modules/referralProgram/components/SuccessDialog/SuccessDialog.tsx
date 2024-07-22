import { Button, Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { Benefits } from '../Benefits';
import {
  IReferralFlowDialogProps,
  ReferralFlowDialog,
} from '../ReferralFlowDialog';
import { successDialogTranslation } from './translation';
import { useSuccessDialogStyles } from './useSuccessDialogStyles';

export interface ISuccessDialogProps extends IReferralFlowDialogProps {
  blockchainName: string | undefined;
  onDoneButtonClick: () => void;
}

export const SuccessDialog = ({
  blockchainName,
  onDoneButtonClick,
  ...dialogProps
}: ISuccessDialogProps) => {
  const {
    keys: { branded, unbranded },
    t,
    tHTML,
  } = useTranslation(successDialogTranslation);

  const keys = blockchainName ? branded : unbranded;

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
        {blockchainName && <Benefits blockchainName={blockchainName} />}
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

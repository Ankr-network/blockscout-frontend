import { Button } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import {
  IReferralCodeDialogProps,
  ReferralCodeDialog,
} from '../ReferralCodeDialog';
import { ISuccessDialogProps, SuccessDialog } from '../SuccessDialog';
import { referralCodeButtonTranslation } from './translation';

export interface IReferralCodeButtonProps {
  handleReferralCodeDialogOpen: () => void;
  referralCodeDialogProps: IReferralCodeDialogProps;
  successDialogProps: ISuccessDialogProps;
}

export const ReferralCodeButton = ({
  handleReferralCodeDialogOpen,
  referralCodeDialogProps,
  successDialogProps,
}: IReferralCodeButtonProps) => {
  const { keys, t } = useTranslation(referralCodeButtonTranslation);

  return (
    <>
      <Button
        onClick={handleReferralCodeDialogOpen}
        size="small"
        variant="text"
      >
        {t(keys.label)}
      </Button>
      <ReferralCodeDialog {...referralCodeDialogProps} />
      <SuccessDialog {...successDialogProps} />
    </>
  );
};

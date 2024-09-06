import { Button } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import {
  IReferralCodeDialogProps,
  ReferralCodeDialog,
} from '../ReferralCodeDialog';
import { ISuccessDialogProps, SuccessDialog } from '../SuccessDialog';
import { referralCodeButtonTranslation } from './translation';
import { useReferralCodeButtonStyles } from './useReferralCodeButtonStyles';

export interface IReferralCodeButtonProps {
  className?: string;
  handleReferralCodeDialogOpen: () => void;
  referralCodeDialogProps: IReferralCodeDialogProps;
  successDialogProps: ISuccessDialogProps;
}

export const ReferralCodeButton = ({
  className,
  handleReferralCodeDialogOpen,
  referralCodeDialogProps,
  successDialogProps,
}: IReferralCodeButtonProps) => {
  const { classes, cx } = useReferralCodeButtonStyles();
  const { keys, t } = useTranslation(referralCodeButtonTranslation);

  return (
    <>
      <Button
        className={cx(classes.root, className)}
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

import { t } from '@ankr.com/common';
import { ExternalLink } from '@ankr.com/ui';

import { PrimaryButton } from 'modules/payments/components/PrimaryButton';
import { REVOKE_CASH_URL } from 'modules/payments/const';
import { SecondaryButton } from 'modules/payments/components/SecondaryButton';

import { useRevokeAllowanceButtonsStyles } from './useRevokeAllowanceButtonsStyles';

export interface IRevokeAllowanceButtonsProps {
  onCheckAllowanceButtonClick: () => void;
  isLoading: boolean;
  onDiscardButtonClick: () => void;
}

export const RevokeAllowanceButtons = ({
  isLoading,
  onCheckAllowanceButtonClick,
  onDiscardButtonClick,
}: IRevokeAllowanceButtonsProps) => {
  const { classes } = useRevokeAllowanceButtonsStyles();

  return (
    <div className={classes.root}>
      <PrimaryButton
        className={classes.revokeButton}
        endIcon={<ExternalLink />}
        href={REVOKE_CASH_URL}
        target="_blank"
      >
        {t('account.crypto-payment-deposit-dialog.revoke-button')}
      </PrimaryButton>
      <SecondaryButton
        className={classes.checkApprovalButton}
        isLoading={isLoading}
        onClick={onCheckAllowanceButtonClick}
      >
        {t('account.crypto-payment-deposit-dialog.check-approval-button')}
      </SecondaryButton>
      <SecondaryButton
        className={classes.cancelButton}
        onClick={onDiscardButtonClick}
      >
        {t('account.crypto-payment-deposit-dialog.cancel-button')}
      </SecondaryButton>
    </div>
  );
};

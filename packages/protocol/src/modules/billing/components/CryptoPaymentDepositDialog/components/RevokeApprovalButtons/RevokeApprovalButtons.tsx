import { t } from '@ankr.com/common';
import { ExternalLink } from '@ankr.com/ui';

import { PrimaryButton } from 'modules/billing/components/CryptoPaymentSummaryDialog/components/PrimaryButton';
import { SecondaryButton } from 'modules/billing/components/CryptoPaymentSummaryDialog/components/SecondaryButton';
import { REVOKE_CASH_URL } from 'modules/billing/const';

import { useRevokeApprovalButtonsStyles } from './useRevokeApprovalButtonsStyles';

interface IRevokeApprovalButtonsProps {
  isLoading: boolean;
  onCheckApproval: () => void;
  onDiscardButtonClick: () => void;
}

export const RevokeApprovalButtons = ({
  isLoading,
  onCheckApproval,
  onDiscardButtonClick,
}: IRevokeApprovalButtonsProps) => {
  const { classes } = useRevokeApprovalButtonsStyles();

  return (
    <div className={classes.root}>
      <PrimaryButton
        className={classes.revokeButton}
        href={REVOKE_CASH_URL}
        target="_blank"
        endIcon={<ExternalLink />}
      >
        {t('account.crypto-payment-deposit-dialog.revoke-button')}
      </PrimaryButton>
      <SecondaryButton
        className={classes.checkApprovalButton}
        isLoading={isLoading}
        onClick={onCheckApproval}
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

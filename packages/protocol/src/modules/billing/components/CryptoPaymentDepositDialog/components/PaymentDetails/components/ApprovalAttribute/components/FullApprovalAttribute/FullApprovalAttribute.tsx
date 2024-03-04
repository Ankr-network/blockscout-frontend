import { t } from '@ankr.com/common';

import { Alert } from 'modules/billing/components/CryptoPaymentDepositDialog/components/PaymentDetails/components/Alert';
import { ECryptoDepositStepStatus, ECurrency } from 'modules/billing/types';
import { Label } from 'modules/billing/components/CryptoPaymentDepositDialog/components/PaymentDetails/components/Label';
import { TxAttribute } from 'modules/billing/components/TxAttribute';
import { renderCryptoAmount } from 'modules/billing/utils/renderCryptoAmount';

import { useFullApprovalAttributeStyles } from './useFullApprovalAttributeStyles';

export interface IFullApprovalAttributeProps {
  approvedAmount: number;
  currency: ECurrency;
}

const alertKey = 'account.payment-flow.steps.approval.full-approval-alert';
const labelKey = 'account.payment-flow.steps.approval.title';

const { Complete } = ECryptoDepositStepStatus;

export const FullApprovalAttribute = ({
  approvedAmount: amount,
  currency,
}: IFullApprovalAttributeProps) => {
  const { classes } = useFullApprovalAttributeStyles();

  const approvedAmount = renderCryptoAmount({ amount, currency });

  const alertText = t(alertKey, { approvedAmount });

  return (
    <TxAttribute
      classes={classes}
      label={<Label status={Complete} text={t(labelKey)} />}
      extraContent={<Alert text={alertText} />}
    >
      –
    </TxAttribute>
  );
};

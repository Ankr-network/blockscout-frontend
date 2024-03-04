import { t } from '@ankr.com/common';

import { ECryptoDepositStepStatus } from 'modules/billing/types';
import { IAlertProps } from 'modules/billing/components/CryptoPaymentDepositDialog/components/PaymentDetails/components/Alert';

export interface IGetAlertPropsParams {
  amountToApprove: string;
  approvedAmount: string;
  error?: string;
  status?: ECryptoDepositStepStatus;
}

const alertKey = 'account.payment-flow.steps.approval.partial-approval-alert';

export const getAlertProps = ({
  amountToApprove,
  approvedAmount,
  error,
  status,
}: IGetAlertPropsParams): IAlertProps => {
  const hasErrorStatus = status === ECryptoDepositStepStatus.Error;

  const text =
    error && hasErrorStatus
      ? error
      : t(alertKey, { amountToApprove, approvedAmount });

  const severity = hasErrorStatus ? 'error' : 'info';

  return { hasIcon: hasErrorStatus, severity, text };
};

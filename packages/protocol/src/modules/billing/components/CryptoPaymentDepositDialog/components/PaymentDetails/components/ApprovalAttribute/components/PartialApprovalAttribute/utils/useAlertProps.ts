import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ECryptoDepositStepStatus } from 'modules/billing/types';
import { IAlertProps } from 'modules/billing/components/CryptoPaymentDepositDialog/components/PaymentDetails/components/Alert';

export interface IGetAlertPropsParams {
  amountToDeposit: string;
  approvedAmount: string;
  error?: string;
  status?: ECryptoDepositStepStatus;
}

const alertKeyNotEnoughApproval =
  'account.payment-flow.steps.approval.partial-approval-alert';
const alertKeyEnougnApproval =
  'account.payment-flow.steps.approval.full-approval-alert';

export const useAlertProps = ({
  amountToDeposit,
  approvedAmount,
  error,
  status,
}: IGetAlertPropsParams): IAlertProps => {
  const hasErrorStatus = status === ECryptoDepositStepStatus.Error;
  const hasEnoughApproval = approvedAmount >= amountToDeposit;

  const text = useMemo(() => {
    if (error && hasErrorStatus) {
      return error;
    }

    if (hasEnoughApproval) {
      return t(alertKeyEnougnApproval, { amountToDeposit, approvedAmount });
    }

    if (!hasEnoughApproval) {
      return t(alertKeyNotEnoughApproval, { amountToDeposit, approvedAmount });
    }

    return '';
  }, [
    amountToDeposit,
    approvedAmount,
    error,
    hasErrorStatus,
    hasEnoughApproval,
  ]);

  const severity = useMemo(() => {
    if (hasErrorStatus) {
      return 'error';
    }

    if (hasEnoughApproval) {
      return 'success';
    }

    return 'info';
  }, [hasEnoughApproval, hasErrorStatus]);

  return { hasIcon: hasErrorStatus, severity, text };
};

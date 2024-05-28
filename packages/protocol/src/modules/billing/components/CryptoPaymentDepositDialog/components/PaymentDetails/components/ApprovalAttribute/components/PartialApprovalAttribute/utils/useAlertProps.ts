import { t, tHTML } from '@ankr.com/common';
import { useMemo } from 'react';

import { ECryptoDepositStepStatus, ECurrency } from 'modules/billing/types';
import { IAlertProps } from 'modules/billing/components/CryptoPaymentDepositDialog/components/PaymentDetails/components/Alert';
import { REVOKE_CASH_URL } from 'modules/billing/const';

export interface IGetAlertPropsParams {
  amountToDeposit: string;
  approvedAmount: number;
  approvedAmountString: string;
  hasEnoughApproval: boolean;
  currency: ECurrency;
  error?: string;
  status?: ECryptoDepositStepStatus;
}

const alertKeyNotEnoughApproval =
  'account.payment-flow.steps.approval.partial-approval-alert';
const alertKeyEnoughApproval =
  'account.payment-flow.steps.approval.full-approval-alert';
const alertKeyRevokeApproval =
  'account.payment-flow.steps.approval.revoke-usdt-approval-alert';

export const useAlertProps = ({
  amountToDeposit,
  approvedAmount,
  approvedAmountString,
  hasEnoughApproval,
  currency,
  error,
  status,
}: IGetAlertPropsParams): IAlertProps => {
  const hasErrorStatus = status === ECryptoDepositStepStatus.Error;

  const isRevokeAlert =
    currency === ECurrency.USDT && approvedAmount !== 0 && !hasEnoughApproval;

  const text = useMemo(() => {
    if (error && hasErrorStatus) {
      return error;
    }

    if (hasEnoughApproval) {
      return t(alertKeyEnoughApproval, {
        amountToDeposit,
        approvedAmount: approvedAmountString,
      });
    }

    if (isRevokeAlert) {
      return tHTML(alertKeyRevokeApproval, {
        approvedAmount: approvedAmountString,
        href: REVOKE_CASH_URL,
      });
    }

    if (!hasEnoughApproval) {
      return t(alertKeyNotEnoughApproval, {
        amountToDeposit,
        approvedAmount: approvedAmountString,
      });
    }

    return '';
  }, [
    amountToDeposit,
    approvedAmountString,
    isRevokeAlert,
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

    if (isRevokeAlert) {
      return 'warning';
    }

    return 'info';
  }, [hasEnoughApproval, hasErrorStatus, isRevokeAlert]);

  return { hasIcon: hasErrorStatus || isRevokeAlert, severity, text };
};

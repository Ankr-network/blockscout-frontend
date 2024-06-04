import { AlertColor } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { useMemo } from 'react';

import { ECryptoDepositStepStatus, ECurrency } from 'modules/payments/types';
import { IAlertProps } from 'modules/payments/components/Alert';
import { REVOKE_CASH_URL } from 'modules/payments/const';

export interface IUseAlertProps {
  allowanceString: string;
  amountString: string;
  currency: ECurrency;
  error?: string;
  hasEnoughAllowance: boolean;
  status?: ECryptoDepositStepStatus;
}

const alertKeyNotEnoughApproval =
  'account.payment-flow.steps.approval.partial-approval-alert';
const alertKeyEnoughApproval =
  'account.payment-flow.steps.approval.full-approval-alert';
const alertKeyRevokeApproval =
  'account.payment-flow.steps.approval.revoke-usdt-approval-alert';

export const useAlert = ({
  allowanceString,
  amountString,
  currency,
  error,
  hasEnoughAllowance,
  status,
}: IUseAlertProps): IAlertProps => {
  const hasErrorStatus = status === ECryptoDepositStepStatus.Error;

  const isRevokeAlert = currency === ECurrency.USDT && !hasEnoughAllowance;

  const text = useMemo(() => {
    if (error && hasErrorStatus) {
      return error;
    }

    if (hasEnoughAllowance) {
      return t(alertKeyEnoughApproval, {
        amountToDeposit: amountString,
        approvedAmount: allowanceString,
      });
    }

    if (isRevokeAlert) {
      return tHTML(alertKeyRevokeApproval, {
        approvedAmount: allowanceString,
        href: REVOKE_CASH_URL,
      });
    }

    return t(alertKeyNotEnoughApproval, {
      amountToDeposit: amountString,
      approvedAmount: allowanceString,
    });
  }, [
    allowanceString,
    amountString,
    error,
    hasEnoughAllowance,
    hasErrorStatus,
    isRevokeAlert,
  ]);

  const severity = useMemo<AlertColor>(() => {
    if (hasErrorStatus) {
      return 'error';
    }

    if (hasEnoughAllowance) {
      return 'success';
    }

    if (isRevokeAlert) {
      return 'warning';
    }

    return 'info';
  }, [hasEnoughAllowance, hasErrorStatus, isRevokeAlert]);

  return { hasIcon: hasErrorStatus || isRevokeAlert, severity, text };
};

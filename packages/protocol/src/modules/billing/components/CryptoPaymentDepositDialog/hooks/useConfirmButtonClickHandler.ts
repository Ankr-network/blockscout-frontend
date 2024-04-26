import { useCallback } from 'react';

import { ECryptoDepositStepStatus } from 'modules/billing/types';

export interface IUseConfirmButtonClickHandlerProps {
  approvalError?: string;
  approvalStatus: ECryptoDepositStepStatus;
  handleDeposit: () => void;
  handleSendAllowance: () => void;
}

export const useConfirmButtonClickHandler = ({
  approvalError,
  approvalStatus,
  handleDeposit,
  handleSendAllowance,
}: IUseConfirmButtonClickHandlerProps) => {
  const onConfirmButtonClick = useCallback(() => {
    const isApprovalConfirmationStatus =
      approvalStatus === ECryptoDepositStepStatus.Confirmation;

    const hasApprovalError = Boolean(approvalError);

    if (isApprovalConfirmationStatus || hasApprovalError) {
      return handleSendAllowance();
    }

    return handleDeposit();
  }, [approvalError, approvalStatus, handleDeposit, handleSendAllowance]);

  return { onConfirmButtonClick };
};

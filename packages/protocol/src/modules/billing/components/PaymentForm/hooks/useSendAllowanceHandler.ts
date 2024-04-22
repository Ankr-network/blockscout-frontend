import { useCallback } from 'react';

import { ECryptoDepositStepStatus } from 'modules/billing/types';
import { useMyAllowance } from 'domains/account/hooks/useMyAllowance';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { useOneTimeDialogState } from './useOneTimeDialogState';

type TPropsToExtend = Pick<
  ReturnType<typeof useOneTimeDialogState>,
  | 'moveToDeposit'
  | 'moveToAwaitingDeposit'
  | 'setApprovalStatus'
  | 'setStartApproval'
>;

export interface IUseSendAllowanceHandlerProps extends TPropsToExtend {}

export const useSendAllowanceHandler = ({
  moveToAwaitingDeposit,
  moveToDeposit,
  setApprovalStatus,
  setStartApproval,
}: IUseSendAllowanceHandlerProps) => {
  const { fetchMyAllowance } = useMyAllowance({ skipFetching: true });

  const {
    amountToDeposit,
    handleSendAllowance: sendAllowance,
    loadingWaitTransactionConfirming: isAwaitingDeposit,
  } = useTopUp();

  const handleSendAllowance = useCallback(async () => {
    setApprovalStatus(ECryptoDepositStepStatus.Pending);

    const sendAllowanceResponce = await sendAllowance();

    if (sendAllowanceResponce.error) {
      setApprovalStatus(ECryptoDepositStepStatus.Error);

      return;
    }

    if (isAwaitingDeposit) {
      moveToAwaitingDeposit();

      return;
    }

    const { data: myAllowance = 0 } = await fetchMyAllowance();

    const hasEnoughAllowance = myAllowance >= amountToDeposit.toNumber();

    if (hasEnoughAllowance) {
      moveToDeposit();

      return;
    }

    setStartApproval();
  }, [
    amountToDeposit,
    fetchMyAllowance,
    isAwaitingDeposit,
    moveToAwaitingDeposit,
    moveToDeposit,
    sendAllowance,
    setApprovalStatus,
    setStartApproval,
  ]);

  return { handleSendAllowance };
};

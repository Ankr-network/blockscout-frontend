import { useCallback } from 'react';

import { ECryptoDepositStepStatus } from 'modules/billing/types';
import { useLazyFetchMyAllowanceQuery } from 'domains/account/actions/fetchMyAllowance';
import { useTopUp } from 'domains/account/hooks/useTopUp';

import { useOneTimeDialogState } from './useOneTimeDialogState';

type TPropsToExtend = Pick<
  ReturnType<typeof useOneTimeDialogState>,
  | 'moveToDeposit'
  | 'moveToAwaitingDeposit'
  | 'setCurrentApprovalStatus'
  | 'setStartApproval'
>;

export interface IUseOneTimeGetAllowanceHandlerProps extends TPropsToExtend {}

export const useOneTimeGetAllowanceHandler = ({
  moveToDeposit,
  moveToAwaitingDeposit,
  setCurrentApprovalStatus,
  setStartApproval,
}: IUseOneTimeGetAllowanceHandlerProps) => {
  const [fetchAllowance] = useLazyFetchMyAllowanceQuery();

  const {
    amountToDeposit,
    handleGetAllowance,
    loadingWaitTransactionConfirming: isAwaitingDeposit,
  } = useTopUp();

  const onGetAllowance = useCallback(async () => {
    setCurrentApprovalStatus(ECryptoDepositStepStatus.Pending);

    const allowanceResponse = await handleGetAllowance();
    const allowanceValueResponse = await fetchAllowance();

    if (allowanceResponse.error || allowanceValueResponse.error) {
      setCurrentApprovalStatus(ECryptoDepositStepStatus.Error);

      return;
    }

    if (isAwaitingDeposit) {
      moveToAwaitingDeposit();

      return;
    }

    const allowanceValueNumber = Number(allowanceValueResponse.data);
    const hasEnoughAllowance = allowanceValueNumber >= Number(amountToDeposit);

    if (hasEnoughAllowance) {
      moveToDeposit();

      return;
    }

    setStartApproval();
  }, [
    amountToDeposit,
    fetchAllowance,
    handleGetAllowance,
    isAwaitingDeposit,
    moveToAwaitingDeposit,
    moveToDeposit,
    setCurrentApprovalStatus,
    setStartApproval,
  ]);

  return { onGetAllowance };
};

import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useTopUp } from 'domains/account/hooks/useTopUp';

export const useCheckBrokenTransaction = () => {
  const transaction = useSelectTopUpTransaction();

  const { handleResetTopUpTransaction } = useTopUp();

  const isAmountEmpty = !transaction?.amount || transaction?.amount?.isZero();

  if (
    isAmountEmpty &&
    (transaction?.allowanceTransactionHash || transaction?.topUpTransactionHash)
  ) {
    handleResetTopUpTransaction();
  }
};

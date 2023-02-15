import { useCheckLoginStep } from './useCheckLoginStep';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';

export const useTopUpTransaction = () => {
  const transaction = useSelectTopUpTransaction();
  const { hasLoginStep } = useCheckLoginStep();

  const { amount, allowanceTransactionHash, topUpTransactionHash } =
    transaction || {};

  const isTopUpInProcess = Boolean(
    allowanceTransactionHash || topUpTransactionHash || hasLoginStep,
  );

  return { amount, isTopUpInProcess };
};

import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';

export const useTopUpTransaction = () => {
  const transaction = useSelectTopUpTransaction();

  const { amount, allowanceTransactionHash, topUpTransactionHash } =
    transaction || {};

  const isTopUpInProcess = Boolean(
    allowanceTransactionHash || topUpTransactionHash,
  );

  return { amount, isTopUpInProcess };
};

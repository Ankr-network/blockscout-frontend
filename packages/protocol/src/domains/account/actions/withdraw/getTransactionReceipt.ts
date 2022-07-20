import { MultiService } from 'modules/api/MultiService';

export const getTransactionReceipt = async (
  withdrawTransactionHash: string,
) => {
  const service = await MultiService.getInstance();

  const transactionReceipt = await service.getTransactionReceipt(
    withdrawTransactionHash,
  );

  return transactionReceipt;
};

import { AppDispatch } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { topUpWaitTransactionConfirming } from '../waitTransactionConfirming';

export const checkTopUpStep = async (
  dispatch: AppDispatch,
  topUpTransactionHash?: string,
) => {
  const service = await MultiService.getWeb3Service();

  if (!topUpTransactionHash) return TopUpStep.deposit;

  const transactionReceipt = await service
    .getContractService()
    .getTransactionReceipt(topUpTransactionHash);

  if (transactionReceipt) return null;

  dispatch(topUpWaitTransactionConfirming.initiate());

  return TopUpStep.waitTransactionConfirming;
};

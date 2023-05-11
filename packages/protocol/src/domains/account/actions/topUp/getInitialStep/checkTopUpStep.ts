import { AppDispatch } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { topUpWaitTransactionConfirming } from '../waitTransactionConfirming';
import { Web3Address } from 'multirpc-sdk';

export const checkTopUpStep = async (
  dispatch: AppDispatch,
  topUpTransactionHash?: string,
  group?: Web3Address,
) => {
  const service = await MultiService.getWeb3Service();

  if (!topUpTransactionHash) return TopUpStep.deposit;

  const transactionReceipt = await service
    .getContractService()
    .getTransactionReceipt(topUpTransactionHash);

  if (transactionReceipt) return null;

  dispatch(topUpWaitTransactionConfirming.initiate({ group }));

  return TopUpStep.waitTransactionConfirming;
};

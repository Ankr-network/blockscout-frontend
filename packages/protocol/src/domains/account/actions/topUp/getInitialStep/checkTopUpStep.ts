import { RequestsStore } from '@redux-requests/core';

import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { waitTransactionConfirming } from '../waitTransactionConfirming';

export const checkTopUpStep = async (
  store: RequestsStore,
  topUpTransactionHash?: string,
) => {
  const service = await MultiService.getInstance();

  if (!topUpTransactionHash) return TopUpStep.deposit;

  const transactionReceipt = await service.getTransactionReceipt(
    topUpTransactionHash,
  );

  if (transactionReceipt) return null;

  store.dispatchRequest(waitTransactionConfirming());

  return TopUpStep.waitTransactionConfirming;
};

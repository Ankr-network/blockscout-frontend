import { getQuery, RequestsStore } from '@redux-requests/core';

import { connect } from 'domains/auth/actions/connect';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { waitTransactionConfirming } from '../waitTransactionConfirming';

export const checkFirstTopUpStep = async (
  address: string,
  store: RequestsStore,
) => {
  const { service } = MultiService.getInstance();

  const lastTopUpEvent = await service.getLastLockedFundsEvent(address);

  const { data: connectData } = getQuery(store.getState(), {
    type: connect.toString(),
    action: connect,
  });

  const hasFirstTopUp = Boolean(lastTopUpEvent) && !connectData?.credentials;

  if (!hasFirstTopUp) return null;

  const transactionReceipt = await service.getTransactionReceipt(
    lastTopUpEvent?.transactionHash as string,
  );

  if (transactionReceipt) return TopUpStep.login;

  store.dispatchRequest(waitTransactionConfirming());

  return TopUpStep.waitTransactionConfirming;
};

import { getQuery, RequestsStore } from '@redux-requests/core';
import BigNumber from 'bignumber.js';

import { connect } from 'domains/auth/actions/connect';
import { MIN_ANKR_AMOUNT } from 'domains/pricing/screens/Pricing/components/PremiumBlock/PricingTopUp/PricingTopUpUtils';
import { MultiService } from 'modules/api/MultiService';
import { TopUpStep } from '../const';
import { waitTransactionConfirming } from '../waitTransactionConfirming';

export const checkFirstTopUpStep = async (
  address: string,
  store: RequestsStore,
) => {
  const service = await MultiService.getInstance();
  const keyProvider = service.getKeyProvider();

  const lastTopUpEvent = await service.getLastLockedFundsEvent(address);

  const value = keyProvider
    .getWeb3()
    .utils.fromWei(lastTopUpEvent?.returnValues?.amount || '');

  const amount = new BigNumber(value);

  const { data: connectData } = getQuery(store.getState(), {
    type: connect.toString(),
    action: connect,
  });

  const isFirstTopup = Boolean(lastTopUpEvent) && !connectData?.credentials;
  const isTopupAfterTokenExpiration =
    Boolean(lastTopUpEvent) &&
    connectData?.credentials &&
    !connectData?.credentials.endpoint_token &&
    amount.isGreaterThanOrEqualTo(MIN_ANKR_AMOUNT);

  const hasFirstTopUp = isFirstTopup || isTopupAfterTokenExpiration;

  if (!hasFirstTopUp) return null;

  const transactionReceipt = await service.getTransactionReceipt(
    lastTopUpEvent?.transactionHash as string,
  );

  if (transactionReceipt) return TopUpStep.login;

  store.dispatchRequest(waitTransactionConfirming());

  return TopUpStep.waitTransactionConfirming;
};

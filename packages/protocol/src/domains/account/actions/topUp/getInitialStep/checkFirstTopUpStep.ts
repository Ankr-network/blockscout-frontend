import BigNumber from 'bignumber.js';

import { AppDispatch, GetState } from 'store';
import { AuthConnectParams, authConnect } from 'domains/auth/actions/connect';
import { DEFAULT_ANKR_VALUE, TopUpStep } from '../const';
import { MultiService } from 'modules/api/MultiService';
import { topUpWaitTransactionConfirming } from '../waitTransactionConfirming';

export const checkFirstTopUpStep = async (
  address: string,
  getState: GetState,
  dispatch: AppDispatch,
) => {
  const service = await MultiService.getWeb3Service();
  const keyProvider = service.getKeyProvider();

  const lastTopUpEvent = await service
    .getContractService()
    .getLastLockedFundsEvent(address);

  const value = keyProvider
    .getWeb3()
    .utils.fromWei(lastTopUpEvent?.returnValues?.amount || '');

  const amount = new BigNumber(value);

  const { data: connectData } = authConnect.select(
    undefined as unknown as AuthConnectParams,
  )(getState());

  const isFirstTopup = Boolean(lastTopUpEvent) && !connectData?.credentials;
  const isTopupAfterTokenExpiration =
    Boolean(lastTopUpEvent) &&
    connectData?.credentials &&
    !connectData?.workerTokenData?.userEndpointToken &&
    amount.isGreaterThanOrEqualTo(DEFAULT_ANKR_VALUE);

  const hasFirstTopUp = isFirstTopup || isTopupAfterTokenExpiration;

  if (!hasFirstTopUp) return null;

  const transactionReceipt = await service
    .getContractService()
    .getTransactionReceipt(lastTopUpEvent?.transactionHash as string);

  if (transactionReceipt) return TopUpStep.login;

  dispatch(topUpWaitTransactionConfirming.initiate());

  return TopUpStep.waitTransactionConfirming;
};

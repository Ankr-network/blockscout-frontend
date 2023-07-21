import BigNumber from 'bignumber.js';
import { Web3Address } from 'multirpc-sdk';

import { AppDispatch, GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { selectAuthData } from 'domains/auth/store/authSlice';

import { DEFAULT_ANKR_VALUE, TopUpStep } from '../const';
import { topUpWaitTransactionConfirming } from '../waitTransactionConfirming';

export const checkFirstTopUpStep = async (
  address: string,
  getState: GetState,
  dispatch: AppDispatch,
  group?: Web3Address,
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
  const { credentials, isInstantJwtParticipant, workerTokenData } =
    selectAuthData(getState());

  const isFirstTopup =
    Boolean(lastTopUpEvent) && !credentials && !isInstantJwtParticipant;

  const isTopupAfterTokenExpiration =
    Boolean(lastTopUpEvent) &&
    credentials &&
    !workerTokenData?.userEndpointToken &&
    amount.isGreaterThanOrEqualTo(DEFAULT_ANKR_VALUE);

  const hasFirstTopUp = isFirstTopup || isTopupAfterTokenExpiration;

  if (!hasFirstTopUp) return null;

  const transactionReceipt = await service
    .getContractService()
    .getTransactionReceipt(lastTopUpEvent?.transactionHash as string);

  if (transactionReceipt && !isInstantJwtParticipant) {
    return TopUpStep.login;
  }

  dispatch(topUpWaitTransactionConfirming.initiate({ group }));

  return TopUpStep.waitTransactionConfirming;
};

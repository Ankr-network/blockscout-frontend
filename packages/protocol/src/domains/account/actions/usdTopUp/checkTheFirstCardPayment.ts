import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';
import { timeout } from 'modules/common/utils/timeout';
import {
  selectAuthData,
  setAuthData,
  IAuthSlice,
} from 'domains/auth/store/authSlice';
import { signout } from 'domains/oauth/actions/signout';
import { MultiRpcWeb3ReadSdk } from 'multirpc-sdk';

const TOPUP_EVENT_TIMEOUT = 3 * 60_000;

const checkLastTopupEvent = async (
  web3ReadService: MultiRpcWeb3ReadSdk,
  store: RequestsStore,
  authData: IAuthSlice,
) => {
  if (!authData || !authData.address) return true;

  const { address, hasWeb3Connection, encryptionPublicKey, isCardPayment } =
    authData;

  const lastTopUpEvent = await web3ReadService
    .getContractService()
    .getLastLockedFundsEvent(authData.address);

  if (!lastTopUpEvent) return true;

  const isFirstPaymentByCardWithWeb3 =
    lastTopUpEvent && hasWeb3Connection && isCardPayment;

  // we should logout user after event. when he logged in token will be issued via web3 wallet
  if (isFirstPaymentByCardWithWeb3) {
    store.dispatch(signout());

    return false;
  }

  // Other cases with google account
  const { jwtToken, workerTokenData } =
    await web3ReadService.getIssuedJwtTokenOrIssue(
      address,
      encryptionPublicKey as string,
    );

  store.dispatch(
    setAuthData({
      credentials: jwtToken,
      workerTokenData,
    }),
  );

  return false;
};

// Checking lastTopUpEvent with card. We should issue credentials for a user
export const checkTheFirstCardPayment = createSmartAction<
  RequestAction<string>
>('usdTopUp/checkTheFirstCardPayment', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    hideNotificationOnError: true,
    onRequest: (request: any, action: RequestAction, store: RequestsStore) => {
      return {
        promise: (async (): Promise<void> => {
          const authData = selectAuthData(store.getState());

          if (authData?.credentials || !authData.address) return;

          const web3ReadService = await MultiService.getWeb3ReadService();

          let shouldWatchForTopupEvent = await checkLastTopupEvent(
            web3ReadService,
            store,
            authData,
          );

          // Check new top up event every 3 minutes
          while (shouldWatchForTopupEvent) {
            // eslint-disable-next-line
            await timeout(TOPUP_EVENT_TIMEOUT);

            const newAuthData = selectAuthData(store.getState());

            if (!newAuthData.address) {
              shouldWatchForTopupEvent = false;
              break;
            }

            // eslint-disable-next-line
            shouldWatchForTopupEvent = await checkLastTopupEvent(
              web3ReadService,
              store,
              newAuthData,
            );
          }
        })(),
      };
    },
  },
}));

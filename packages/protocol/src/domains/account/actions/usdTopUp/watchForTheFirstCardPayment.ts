import { EthAddressType, MultiRpcWeb3ReadSdk } from 'multirpc-sdk';

import { ANKR_PAYMENT_NETWORK } from 'modules/payments/const';
import { AppDispatch, RootState } from 'store';
import {
  IAuthSlice,
  selectAuthData,
  setAuthData,
} from 'domains/auth/store/authSlice';
import { MultiService } from 'modules/api/MultiService';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { oauthSignout } from 'domains/oauth/actions/signout';
import { timeout } from 'modules/common/utils/timeout';
import { web3Api } from 'store/queries';

const ONE_MINUTE_MS = 60_000;
const TOPUP_EVENT_TIMEOUT = 3 * ONE_MINUTE_MS;

interface ICheckLastTopupEventParams {
  web3ReadService: MultiRpcWeb3ReadSdk;
  dispatch: AppDispatch;
  authData: IAuthSlice;
}

const checkLastTopupEvent = async ({
  web3ReadService,
  dispatch,
  authData,
}: ICheckLastTopupEventParams) => {
  const { authAddress, authAddressType } = authData;

  if (authAddress) {
    return false;
  }

  const {
    hasWeb3Connection,
    encryptionPublicKey,
    isCardPayment,
    credentials,
    workerTokenData,
  } = authData;

  const lastTopUpEvent = await web3ReadService
    .getContractService()
    .getLastLockedFundsEvent(authAddress!, ANKR_PAYMENT_NETWORK);

  if (!lastTopUpEvent) {
    return true;
  }

  const isFirstPaymentByCardWithWeb3 =
    !credentials && hasWeb3Connection && isCardPayment;

  const isCardTopupAfterTokenExpiration =
    credentials &&
    hasWeb3Connection &&
    !workerTokenData?.userEndpointToken &&
    isCardPayment;

  // we should logout user after event. when he log in, token will be issued via web3 wallet
  if (isFirstPaymentByCardWithWeb3 || isCardTopupAfterTokenExpiration) {
    dispatch(oauthSignout.initiate());

    return false;
  }

  if (authAddressType === EthAddressType.User) {
    return false;
  }

  // Other cases with google account
  const { jwtToken, workerTokenData: currentWorkerTokenData } =
    await web3ReadService.getIssuedJwtTokenOrIssue(
      authAddress!,
      encryptionPublicKey as string,
      ANKR_PAYMENT_NETWORK,
    );

  dispatch(
    setAuthData({
      credentials: jwtToken,
      workerTokenData: currentWorkerTokenData,
    }),
  );

  dispatch(
    NotificationActions.showNotification({
      message: 'account.premium-success',
      severity: 'success',
      autoHideDuration: ONE_MINUTE_MS,
      isHTML: true,
    }),
  );

  return false;
};

export const {
  endpoints: { usdTopUpWatchForTheFirstCardPayment },
  useUsdTopUpWatchForTheFirstCardPaymentQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    usdTopUpWatchForTheFirstCardPayment: build.query<boolean, void>({
      queryFn: async (_args, { getState, dispatch }) => {
        const authData = selectAuthData(getState() as RootState);

        if (authData.workerTokenData || authData.authAddress) {
          return { data: true };
        }

        const web3ReadService = await MultiService.getWeb3ReadService();

        let shouldWatchForTopupEvent = await checkLastTopupEvent({
          authData,
          dispatch,
          web3ReadService,
        });

        // Check new top up event every 3 minutes
        while (shouldWatchForTopupEvent) {
          // eslint-disable-next-line
          await timeout(TOPUP_EVENT_TIMEOUT);

          const newAuthData = selectAuthData(getState() as RootState);

          if (!newAuthData.authAddress) {
            break;
          }

          // eslint-disable-next-line
          shouldWatchForTopupEvent = await checkLastTopupEvent({
            web3ReadService,
            dispatch,
            authData: newAuthData,
          });
        }

        return { data: true };
      },
    }),
  }),
});

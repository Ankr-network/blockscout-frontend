import { Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { RootState } from 'store';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

import { accountFetchPublicKey } from '../fetchPublicKey';

export const ONE_TIME_PAYMENT_ID = 'one_time';

export type OneTimePaymentIdType = typeof ONE_TIME_PAYMENT_ID;

export interface FetchLinkForCardPaymentParams {
  amount: string;
  groupAddress?: Web3Address;
  reason?: string;
}

export const {
  useLazyUsdTopUpFetchLinkForOneTimePaymentQuery,
  endpoints: { usdTopUpFetchLinkForOneTimePayment },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    usdTopUpFetchLinkForOneTimePayment: build.query<
      string,
      FetchLinkForCardPaymentParams
    >({
      queryFn: async (
        { amount, groupAddress, reason },
        { dispatch, getState },
      ) => {
        const service = MultiService.getService();
        const { hasWeb3Connection } = selectAuthData(getState() as RootState);

        const publicKey =
          hasWeb3Connection && !groupAddress
            ? await dispatch(accountFetchPublicKey.initiate()).unwrap()
            : undefined;

        const { url } = await service.getAccountGateway().getLinkForCardPayment(
          {
            amount,
            publicKey,
            reason,
          },
          { group: groupAddress },
        );

        return { data: url };
      },
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          dispatch(setAuthData({ isCardPayment: true }));
        } catch (error: any) {
          const errorMessage = error?.response?.data?.error;

          if (errorMessage) {
            dispatch(
              NotificationActions.showNotification({
                message: errorMessage,
                severity: 'error',
              }),
            );
          }

          throw error;
        }
      },
    }),
  }),
});

import { Web3Address } from 'multirpc-sdk';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { fetchLinkForBundlePayment } from '../bundles/fetchLinkForBundlePayment';
import { setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

export interface FetchLinkForCardPaymentParams {
  priceId: string;
  productId: string;
  groupAddress?: Web3Address;
}

export const {
  useLazyUsdTopUpFetchLinkForBundlePaymentQuery,
  endpoints: { usdTopUpFetchLinkForBundlePayment },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    usdTopUpFetchLinkForBundlePayment: build.query<
      string | undefined,
      FetchLinkForCardPaymentParams
    >({
      queryFn: async ({ priceId, productId, groupAddress }, { dispatch }) => {
        const url = await dispatch(
          fetchLinkForBundlePayment.initiate({
            productId,
            priceId,
            group: groupAddress,
          }),
        ).unwrap();

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

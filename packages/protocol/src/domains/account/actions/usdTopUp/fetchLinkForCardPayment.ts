import { Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { RootState } from 'store';
import { USD_CURRENCY } from './const';
import { accountFetchPublicKey } from '../fetchPublicKey';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { selectBundlePaymentByPriceId } from 'domains/account/store/selectors';
import { web3Api } from 'store/queries';

export const ONE_TIME_PAYMENT_ID = 'one_time';

export type OneTimePaymentIdType = typeof ONE_TIME_PAYMENT_ID;

export interface FetchLinkForCardPaymentParams {
  amount: string;
  id?: string | OneTimePaymentIdType;
  groupAddress?: Web3Address;
}

export const {
  useLazyUsdTopUpFetchLinkForCardPaymentQuery,
  endpoints: { usdTopUpFetchLinkForCardPayment },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    usdTopUpFetchLinkForCardPayment: build.query<
      string,
      FetchLinkForCardPaymentParams
    >({
      queryFn: async ({ amount, id, groupAddress }, { dispatch, getState }) => {
        const state = getState() as RootState;

        const api = MultiService.getService().getAccountGateway();
        const { hasWeb3Connection } = selectAuthData(state);

        const encryptionPublicKey =
          hasWeb3Connection && !groupAddress
            ? await dispatch(accountFetchPublicKey.initiate()).unwrap()
            : undefined;

        const isRecurrentPaymentId = id && id !== ONE_TIME_PAYMENT_ID;

        const bundlePayment = selectBundlePaymentByPriceId(state, id);

        if (bundlePayment) {
          const { bundle } = bundlePayment;

          const { url } = await api.getLinkForBundlePayment(
            {
              product_id: bundle.product_id,
              product_price_id: bundle.price_id,
            },
            { group: groupAddress },
          );

          return { data: url };
        }

        if (isRecurrentPaymentId) {
          const { url } = await api.getLinkForRecurrentCardPayment(
            {
              currency: USD_CURRENCY,
              product_price_id: id,
              public_key: encryptionPublicKey,
            },
            { group: groupAddress },
          );

          return { data: url };
        }

        const { url } = await api.getLinkForCardPayment(
          { amount, publicKey: encryptionPublicKey },
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

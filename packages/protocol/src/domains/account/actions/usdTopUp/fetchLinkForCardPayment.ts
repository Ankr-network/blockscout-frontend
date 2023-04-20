import { Web3Address } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { RootState } from 'store';
import { USD_CURRENCY } from './const';
import { accountFetchPublicKey } from '../fetchPublicKey';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
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
        const service = MultiService.getService();
        const { hasWeb3Connection } = selectAuthData(getState() as RootState);

        const encryptionPublicKey =
          hasWeb3Connection && !groupAddress
            ? await dispatch(accountFetchPublicKey.initiate()).unwrap()
            : undefined;

        const isRecurrentPaymentId = id && id !== ONE_TIME_PAYMENT_ID;

        if (isRecurrentPaymentId) {
          const { url } = await service
            .getAccountGateway()
            .getLinkForRecurrentCardPayment(
              {
                currency: USD_CURRENCY,
                product_price_id: id,
                public_key: encryptionPublicKey,
              },
              { group: groupAddress },
            );

          return { data: url };
        }

        const { url } = await service.getAccountGateway().getLinkForCardPayment(
          {
            amount,
            publicKey: encryptionPublicKey,
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

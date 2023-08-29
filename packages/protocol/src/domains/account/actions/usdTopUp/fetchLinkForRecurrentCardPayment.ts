import { Web3Address } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { RootState } from 'store';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

import { USD_CURRENCY } from './const';
import { accountFetchPublicKey } from '../fetchPublicKey';

export interface FetchLinkForCardPaymentParams {
  id: string;
  groupAddress?: Web3Address;
}

export const {
  useLazyUsdTopUpFetchLinkForRecurrentCardPaymentQuery,
  endpoints: { usdTopUpFetchLinkForRecurrentCardPayment },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    usdTopUpFetchLinkForRecurrentCardPayment: build.query<
      string,
      FetchLinkForCardPaymentParams
    >({
      queryFn: async ({ id, groupAddress }, { dispatch, getState }) => {
        const service = MultiService.getService();
        const { hasWeb3Connection } = selectAuthData(getState() as RootState);

        const publicKey =
          hasWeb3Connection && !groupAddress
            ? await dispatch(accountFetchPublicKey.initiate()).unwrap()
            : undefined;

        const { url } = await service
          .getAccountingGateway()
          .getLinkForRecurrentCardPayment(
            {
              currency: USD_CURRENCY,
              product_price_id: id,
              public_key: publicKey,
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

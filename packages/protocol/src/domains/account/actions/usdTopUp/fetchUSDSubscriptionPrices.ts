import { IApiUserGroupParams, SubscriptionPrice } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { setAuthData } from 'domains/auth/store/authSlice';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { isAxiosAccountingError } from 'store/utils/isAxiosAccountingError';

export const {
  endpoints: { fetchUSDSubscriptionPrices },
  useFetchUSDSubscriptionPricesQuery,
  useLazyFetchUSDSubscriptionPricesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUSDSubscriptionPrices: build.query<
      SubscriptionPrice[],
      IApiUserGroupParams
    >({
      queryFn: async ({ group }) => {
        const api = MultiService.getService().getAccountingGateway();
        const { productPrices } = await api.getUSDSubscriptionPrices({ group });

        return { data: productPrices };
      },
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          dispatch(setAuthData({ isCardPayment: true }));
        } catch (error) {
          const errorMessage = isAxiosAccountingError(error)
            ? error.response?.data.error
            : undefined;

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

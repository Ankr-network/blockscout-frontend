import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { accountFetchSubscriptionsData } from '../fetchMySubscriptionsData';

interface CancelSubscriptionParams {
  subscriptionId: string;
  group?: string;
}

export const {
  useLazyCancelSubscriptionQuery,
  endpoints: { cancelSubscription },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    cancelSubscription: build.query<
      void,
      TwoFAQueryFnParams<CancelSubscriptionParams>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ params: { subscriptionId, group }, totp }) => {
          const service = MultiService.getService();

          const data = await service
            .getAccountGateway()
            .cancelSubscription(
              { subscription_id: subscriptionId },
              { group, totp },
            );

          return { data };
        },
        errorHandler: error => {
          return {
            error,
          };
        },
      }),
      onQueryStarted: async (
        { params: { group } },
        { dispatch, queryFulfilled },
      ) => {
        await queryFulfilled;

        dispatch(accountFetchSubscriptionsData.initiate({ group }));
      },
    }),
  }),
});

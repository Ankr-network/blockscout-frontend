import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { web3Api } from 'store/queries';

export interface CancelSubscriptionParams {
  subscriptionId: string;
  group?: string;
}

export const {
  endpoints: { cancelSubscription },
  useCancelSubscriptionMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    cancelSubscription: build.mutation<
      void,
      TwoFAQueryFnParams<CancelSubscriptionParams>
    >({
      invalidatesTags: ['MySubscriptions'],
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ params: { subscriptionId, group }, totp }) => {
          const api = MultiService.getService().getAccountGateway();

          const data = await api.cancelSubscription(
            { subscription_id: subscriptionId },
            { group, totp },
          );

          return { data };
        },
        errorHandler: error => ({ error }),
      }),
    }),
  }),
  overrideExisting: true,
});

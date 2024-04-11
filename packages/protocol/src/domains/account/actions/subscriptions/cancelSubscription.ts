import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

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
      boolean,
      TwoFAQueryFnParams<CancelSubscriptionParams>
    >({
      invalidatesTags: [RequestType.MySubscriptions, RequestType.MyBundles],
      queryFn: createNotifyingQueryFn(
        async ({ params: { subscriptionId, group }, totp }) => {
          const api = MultiService.getService().getAccountingGateway();

          await api.cancelSubscription(
            { subscription_id: subscriptionId },
            { group, totp },
          );

          return { data: true };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export interface CancelBundleSubscriptionParams {
  subscriptionId: string;
  group?: string;
}

export const {
  endpoints: { cancelBundleSubscription },
  useCancelBundleSubscriptionMutation,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    cancelBundleSubscription: build.mutation<
      boolean,
      TwoFAQueryFnParams<CancelBundleSubscriptionParams>
    >({
      invalidatesTags: [RequestType.MyBundles],
      queryFn: createNotifyingQueryFn(
        async ({ params: { subscriptionId, group }, totp }) => {
          const api = MultiService.getService().getAccountingGateway();

          await api.cancelBundleSubscription(subscriptionId, {
            group,
            totp,
          });

          return { data: true };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

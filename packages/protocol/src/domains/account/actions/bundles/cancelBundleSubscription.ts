import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { web3Api } from 'store/queries';

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
      null,
      TwoFAQueryFnParams<CancelBundleSubscriptionParams>
    >({
      invalidatesTags: ['MyBundles'],
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ params: { subscriptionId, group }, totp }) => {
          const api = MultiService.getService().getAccountGateway();

          await api.cancelBundleSubscription(subscriptionId, { group, totp });

          return { data: null };
        },
        errorHandler: error => ({ error }),
      }),
    }),
  }),
  overrideExisting: true,
});
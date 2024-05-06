import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RootState } from 'store';

import { selectMyBundles } from '../../store/selectors';

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
      onQueryStarted: async (
        { params: { subscriptionId } },
        { dispatch, queryFulfilled, getState },
      ) => {
        const currentBundles = selectMyBundles(getState() as RootState);
        const bundlesWithoutCurrent = currentBundles.filter(
          bundle => bundle.subscriptionId !== subscriptionId,
        );

        await queryFulfilled;

        // we have to update data for fetchMyBundles query instead of using invalidatesTags: [RequestType.MyBundles]
        // because there is some delay on the backend side and we can't rely on the response
        dispatch(
          web3Api.util.updateQueryData(
            'fetchMyBundles' as unknown as never,
            undefined as unknown as never,
            () => bundlesWithoutCurrent,
          ),
        );
      },
    }),
  }),
  overrideExisting: true,
});

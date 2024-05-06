import { MultiService } from 'modules/api/MultiService';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { RootState } from 'store';

import { selectMySubscriptions } from '../../store/selectors';

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
      onQueryStarted: async (
        { params: { subscriptionId } },
        { dispatch, queryFulfilled, getState },
      ) => {
        const currentSubscriptions = selectMySubscriptions(
          getState() as RootState,
        );
        const subscriptionsWithoutCurrent = currentSubscriptions.filter(
          subscription => subscription.subscriptionId !== subscriptionId,
        );

        await queryFulfilled;

        // we have to update data for fetchMySubscriptions query instead of using invalidatesTags: [RequestType.MySubscriptions]
        // because there is some delay on the backend side and we can't rely on the response
        dispatch(
          web3Api.util.updateQueryData(
            'fetchMySubscriptions' as unknown as never,
            undefined as unknown as never,
            () => ({
              items: subscriptionsWithoutCurrent,
            }),
          ),
        );
      },
    }),
  }),
  overrideExisting: true,
});

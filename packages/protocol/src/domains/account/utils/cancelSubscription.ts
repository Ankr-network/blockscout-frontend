import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { GetState } from 'store';
import { getSelectedGroupAddress } from 'domains/userGroup/utils/getSelectedGroupAddress';

export const {
  useLazyCancelSubscriptionQuery,
  endpoints: { cancelSubscription },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    cancelSubscription: build.query<void, string>({
      queryFn: async (subscriptionId, { getState }) => {
        const service = MultiService.getService();
        const { selectedGroupAddress: group } = getSelectedGroupAddress(
          getState as GetState,
        );

        const data = await service
          .getAccountGateway()
          .cancelSubscription({ subscription_id: subscriptionId, group });

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

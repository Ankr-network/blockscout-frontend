import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  useLazyCancelSubscriptionQuery,
  endpoints: { cancelSubscription },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    cancelSubscription: build.query<void, string>({
      queryFn: async subscriptionId => {
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .cancelSubscription(subscriptionId);

        return { data };
      },
    }),
  }),
});

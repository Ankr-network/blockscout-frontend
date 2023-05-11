import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { IApiUserGroupParams } from 'multirpc-sdk';

interface IRequestParams extends IApiUserGroupParams {
  subscriptionId: string;
}

export const {
  useLazyCancelSubscriptionQuery,
  endpoints: { cancelSubscription },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    cancelSubscription: build.query<void, IRequestParams>({
      queryFn: async ({ subscriptionId, group }) => {
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .cancelSubscription({ subscription_id: subscriptionId }, { group });

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

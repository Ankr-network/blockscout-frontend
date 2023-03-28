import { PremiumStatus } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchPremiumStatus },
  useLazyFetchPremiumStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPremiumStatus: build.query<PremiumStatus, string>({
      queryFn: createNotifyingQueryFn(async userEndpointToken => {
        const service = MultiService.getService();

        const status = await service
          .getWorkerGateway()
          .getPremiumStatus(userEndpointToken);

        return { data: status };
      }),
    }),
  }),
});

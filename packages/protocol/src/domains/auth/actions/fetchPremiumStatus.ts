import { GetPremiumStatusResult, PremiumStatus } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

export const defaultPremiumStatusData: GetPremiumStatusResult = {
  isFreemium: true,
  status: PremiumStatus.INACTIVE,
};

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchPremiumStatus },
  useFetchPremiumStatusQuery,
  useLazyFetchPremiumStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchPremiumStatus: build.query<GetPremiumStatusResult, string>({
      queryFn: createNotifyingQueryFn(async userEndpointToken => {
        const service = MultiService.getService();

        const data = await service
          .getWorkerGateway()
          .getPremiumStatus(userEndpointToken);

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

import { fetchEnterpriseEndpoints } from './fetchEnterpriseEndpoints';

export const {
  endpoints: { fetchIsEnterpriseClient },
  useLazyFetchIsEnterpriseClientQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchIsEnterpriseClient: build.query<boolean, IApiUserGroupParams>({
      queryFn: async params => {
        const service = MultiService.getService();

        const { is_client: isEnterpriseClient } = await service
          .getEnterpriseGateway()
          .checkIsClient(params);

        return { data: isEnterpriseClient };
      },
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        const { data: isEnterpriseClient } = await queryFulfilled;

        if (isEnterpriseClient) {
          dispatch(fetchEnterpriseEndpoints.initiate({ params }));
        }
      },
    }),
  }),
});

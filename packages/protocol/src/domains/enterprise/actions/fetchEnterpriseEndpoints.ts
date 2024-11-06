import { EnterpriseClientEndpoint } from 'multirpc-sdk/src/enterprise/types';
import { IApiUserGroupParams } from 'multirpc-sdk';

import { TwoFAQueryFnParams } from 'store/queries/types';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';
import { web3Api } from 'store/queries';
import { MultiService } from 'modules/api/MultiService';

export const {
  endpoints: { fetchEnterpriseEndpoints },
  useLazyFetchEnterpriseEndpointsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchEnterpriseEndpoints: build.query<
      EnterpriseClientEndpoint[],
      TwoFAQueryFnParams<IApiUserGroupParams>
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async ({ params: { group }, totp }) => {
          const service = MultiService.getService();
          const { api_keys: apiKeys } = await service
            .getEnterpriseGateway()
            .getEndpoints({ group }, totp);

          return {
            data: apiKeys,
          };
        },
      }),
    }),
  }),
});

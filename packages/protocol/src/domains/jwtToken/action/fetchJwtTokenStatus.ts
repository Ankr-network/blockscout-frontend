import {
  GetUserEndpointTokenStatusResponse,
  IApiUserGroupParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

interface FetchTokenStatusParams extends IApiUserGroupParams {
  userEndpointToken: string;
}

export const {
  endpoints: { fetchJwtTokenStatus },
  useLazyFetchJwtTokenStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchJwtTokenStatus: build.query<
      GetUserEndpointTokenStatusResponse,
      FetchTokenStatusParams
    >({
      queryFn: async ({ group, userEndpointToken }) => {
        const service = MultiService.getService().getAccountingGateway();

        const status = await service.getUserEndpointTokenStatus({
          token: userEndpointToken,
          group,
        });

        return { data: status };
      },
    }),
  }),
  overrideExisting: true,
});

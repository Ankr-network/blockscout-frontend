import {
  GetUserEndpointTokenStatusResponse,
  IApiUserGroupParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

import { JwtManagerToken } from '../store/jwtTokenManagerSlice';

interface FetchTokenStatusParams extends IApiUserGroupParams {
  projects: JwtManagerToken[];
}

export interface FetchTokenStatusResponse {
  userEndpointToken: string;
  status: GetUserEndpointTokenStatusResponse;
}

export const {
  useLazyFetchAllJwtTokensStatusesQuery,
  endpoints: { fetchAllJwtTokensStatuses },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllJwtTokensStatuses: build.query<
      FetchTokenStatusResponse[],
      FetchTokenStatusParams
    >({
      queryFn: async ({ projects, group }) => {
        const service = MultiService.getService().getAccountingGateway();

        const projectsStatuses = await Promise.all(
          projects.map(async ({ userEndpointToken }) => {
            const status = await service.getUserEndpointTokenStatus({
              token: userEndpointToken,
              group,
            });

            return {
              userEndpointToken,
              status,
            };
          }),
        );

        return { data: projectsStatuses };
      },
    }),
  }),
  overrideExisting: true,
});

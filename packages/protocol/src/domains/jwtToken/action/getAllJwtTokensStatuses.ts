import {
  GetUserEndpointTokenStatusResponse,
  IApiUserGroupParams,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

import { JWT } from '../store/jwtTokenManagerSlice';

export interface FetchTokenStatusParams extends IApiUserGroupParams {
  projects: JWT[];
}

export interface FetchTokenStatusResponse {
  userEndpointToken: string;
  status: GetUserEndpointTokenStatusResponse;
}

export const {
  endpoints: { fetchAllJwtTokensStatuses },
  useFetchAllJwtTokensStatusesQuery,
  useLazyFetchAllJwtTokensStatusesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllJwtTokensStatuses: build.query<
      FetchTokenStatusResponse[],
      FetchTokenStatusParams
    >({
      queryFn: async ({ group, projects }) => {
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

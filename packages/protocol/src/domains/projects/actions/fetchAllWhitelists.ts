import {
  IApiUserGroupParams,
  IGetWhitelistParamsResponse,
  UserEndpointTokenMode,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectJWTs } from 'domains/jwtToken/action/fetchJWTs';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchAllWhitelists },
  useFetchAllWhitelistsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllWhitelists: build.query<
      IGetWhitelistParamsResponse[],
      IApiUserGroupParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }, { getState }) => {
        const service = MultiService.getService().getAccountingGateway();

        const projects = selectJWTs(getState() as RootState, { group });

        const whitelists = await Promise.all(
          projects.map(projectItem =>
            service.getWhitelist({
              token: projectItem.userEndpointToken,
              type: UserEndpointTokenMode.ALL,
              group,
            }),
          ),
        );

        return { data: whitelists };
      }),
    }),
  }),
});

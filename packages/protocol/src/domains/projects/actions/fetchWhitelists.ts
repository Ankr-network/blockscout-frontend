import { Address } from '@ankr.com/provider';
import { IGetWhitelistParamsResponse } from 'multirpc-sdk';

import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

interface FetchWhitelistRequestParams {
  group?: Address;
}

export const {
  useLazyFetchWhitelistsQuery,

  endpoints: { fetchWhitelists },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchWhitelists: build.query<
      IGetWhitelistParamsResponse[],
      FetchWhitelistRequestParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }, { getState }) => {
        const service = MultiService.getService().getAccountGateway();

        const projects = selectJwtTokens(getState() as RootState);

        const whitelists = await Promise.all(
          projects.map(project =>
            service.getWhitelist({
              token: project.userEndpointToken,
              type: 'address',
              group,
            }),
          ),
        );

        return { data: whitelists };
      }),
    }),
  }),
});

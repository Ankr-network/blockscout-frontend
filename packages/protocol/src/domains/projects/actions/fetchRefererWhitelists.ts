import { Address } from '@ankr.com/provider';
import { IGetWhitelistParamsResponse } from 'multirpc-sdk';

import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

import { WhiteListItem } from '../types';

interface FetchRefererWhitelistRequestParams {
  group?: Address;
}

export const {
  useLazyFetchRefererWhitelistsQuery,

  endpoints: { fetchRefererWhitelists },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchRefererWhitelists: build.query<
      IGetWhitelistParamsResponse[],
      FetchRefererWhitelistRequestParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }, { getState }) => {
        const service = MultiService.getService().getAccountGateway();

        const projects = selectJwtTokens(getState() as RootState);

        const whitelists = await Promise.all(
          projects.map(project =>
            service.getWhitelist({
              token: project.userEndpointToken,
              type: WhiteListItem.referer,
              group,
            }),
          ),
        );

        return { data: whitelists };
      }),
    }),
  }),
});

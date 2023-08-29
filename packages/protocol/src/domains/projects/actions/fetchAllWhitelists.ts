import { Address } from '@ankr.com/provider';
import { IGetWhitelistParamsResponse } from 'multirpc-sdk';

import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

import { WhiteListItem } from '../types';

interface FetchAllWhitelistRequestParams {
  group?: Address;
}

export const {
  useLazyFetchAllWhitelistsQuery,

  endpoints: { fetchAllWhitelists },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllWhitelists: build.query<
      IGetWhitelistParamsResponse[],
      FetchAllWhitelistRequestParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }, { getState }) => {
        const service = MultiService.getService().getAccountingGateway();

        const projects = selectJwtTokens(getState() as RootState);

        const whitelists = await Promise.all(
          projects.map(project =>
            service.getWhitelist({
              token: project.userEndpointToken,
              type: WhiteListItem.all,
              group,
            }),
          ),
        );

        return { data: whitelists };
      }),
    }),
  }),
});

import { Address } from '@ankr.com/provider';
import { IGetWhitelistParamsResponse } from 'multirpc-sdk';

import { selectJwtTokens } from 'domains/jwtToken/store/selectors';
import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

import { WhiteListItem } from '../types';

interface FetchAddressWhitelistRequestParams {
  group?: Address;
}

export const {
  useLazyFetchAddressWhitelistsQuery,

  endpoints: { fetchAddressWhitelists },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAddressWhitelists: build.query<
      IGetWhitelistParamsResponse[],
      FetchAddressWhitelistRequestParams
    >({
      queryFn: createNotifyingQueryFn(async ({ group }, { getState }) => {
        const service = MultiService.getService().getAccountGateway();

        const projects = selectJwtTokens(getState() as RootState);

        const whitelists = await Promise.all(
          projects.map(project =>
            service.getWhitelist({
              token: project.userEndpointToken,
              type: WhiteListItem.address,
              group,
            }),
          ),
        );

        return { data: whitelists };
      }),
    }),
  }),
});

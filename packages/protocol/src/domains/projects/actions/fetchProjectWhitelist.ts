import {
  IApiUserGroupParams,
  IGetWhitelistParamsResponse,
  UserEndpointTokenMode,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export interface FetchProjectWhitelistParams extends IApiUserGroupParams {
  userEndpointToken: string;
}

export const {
  useLazyFetchProjectWhitelistQuery,
  endpoints: { fetchProjectWhitelist },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectWhitelist: build.query<
      IGetWhitelistParamsResponse,
      FetchProjectWhitelistParams
    >({
      providesTags: ['ProjectWhitelist'],
      queryFn: createNotifyingQueryFn(async ({ userEndpointToken, group }) => {
        const service = MultiService.getService().getAccountingGateway();

        const whitelist = await service.getWhitelist({
          token: userEndpointToken,
          type: UserEndpointTokenMode.ALL,
          group,
        });

        return { data: whitelist };
      }),
    }),
  }),
});

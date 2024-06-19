import {
  IApiUserGroupParams,
  IGetWhitelistParamsResponse,
  UserEndpointTokenMode,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';

export interface FetchProjectWhitelistParams extends IApiUserGroupParams {
  userEndpointToken: string;
}

export const {
  endpoints: { fetchProjectWhitelist },
  useLazyFetchProjectWhitelistQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectWhitelist: build.query<
      IGetWhitelistParamsResponse,
      FetchProjectWhitelistParams
    >({
      providesTags: [RequestType.ProjectWhitelist],
      queryFn: createNotifyingQueryFn(async ({ group, userEndpointToken }) => {
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

import {
  IApiUserGroupParams,
  IGetWhitelistParamsResponse,
  UserEndpointTokenMode,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

export interface FetchProjectWhitelistParams extends IApiUserGroupParams {
  userEndpointToken: string;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectWhitelist },
  useFetchProjectWhitelistQuery,
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

export const {
  selectDataCachedByParams: selectProjectWhitelist,
  selectLoadingCachedByParams: selectProjectWhitelistLoading,
  selectStateCachedByParams: selectProjectWhitelistState,
} = createQuerySelectors({ endpoint: fetchProjectWhitelist });

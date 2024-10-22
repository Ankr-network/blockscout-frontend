import { IApiUserGroupParams } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

export interface IFetchAllowedJWTsCountParams extends IApiUserGroupParams {}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchAllowedJWTsCount },
  useFetchAllowedJWTsCountQuery,
  useLazyFetchAllowedJWTsCountQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllowedJWTsCount: build.query<number, IFetchAllowedJWTsCountParams>({
      queryFn: async ({ group }) => {
        const api = MultiService.getService().getAccountingGateway();

        const data = await api.getAllowedJwtTokensCount({ group });

        return { data };
      },
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectAllowedJWTsCount,
  selectLoadingCachedByParams: selectAllowedJWTsCountLoading,
  selectStateCachedByParams: selectAllowedJWTsCountState,
} = createQuerySelectors({
  endpoint: fetchAllowedJWTsCount,
  fallback: 0,
});

import { IApiUserGroupParams, IGetWhitelistParamsResponse } from 'multirpc-sdk';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { fetchProjectWhitelist } from './fetchProjectWhitelist';

export interface IFetchProjectsWhitelistsParams extends IApiUserGroupParams {
  projects: JWT[];
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectsWhitelists },
  useFetchProjectsWhitelistsQuery,
  useLazyFetchProjectsWhitelistsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectsWhitelists: build.query<
      IGetWhitelistParamsResponse[],
      IFetchProjectsWhitelistsParams
    >({
      queryFn: createNotifyingQueryFn(
        async ({ group, projects }, { dispatch }) => {
          const whitelists = await Promise.all(
            projects.map(({ userEndpointToken }) =>
              dispatch(
                fetchProjectWhitelist.initiate({ group, userEndpointToken }),
              ).unwrap(),
            ),
          );

          return { data: whitelists };
        },
      ),
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectProjectsWhitelists,
  selectLoadingCachedByParams: selectProjectsWhitelistsLoading,
  selectStateCachedByParams: selectProjectsWhitelistsState,
} = createQuerySelectors({
  endpoint: fetchProjectsWhitelists,
  fallback: [],
});

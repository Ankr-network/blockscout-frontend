import { IApiUserGroupParams } from 'multirpc-sdk';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

import { fetchProjectWhitelistBlockchains } from './fetchProjectWhitelistBlockchains';

export interface IFetchProjectsWhitelistsBlockchainsParams
  extends IApiUserGroupParams {
  projects: JWT[];
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectsWhitelistsBlockchains },
  useFetchProjectsWhitelistsBlockchainsQuery,
  useLazyFetchProjectsWhitelistsBlockchainsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectsWhitelistsBlockchains: build.query<
      null,
      IFetchProjectsWhitelistsBlockchainsParams
    >({
      providesTags: [RequestType.WhitelistsBlockchains],
      queryFn: createNotifyingQueryFn(
        async ({ group, projects }, { dispatch }) => {
          console.log({ fetchProjectsWhitelistsBlockchains: true });
          await Promise.all(
            projects.map(async ({ userEndpointToken: token }) =>
              dispatch(
                fetchProjectWhitelistBlockchains.initiate({ group, token }),
              ),
            ),
          );

          return { data: null };
        },
      ),
    }),
  }),
});

export const {
  selectLoadingCachedByParams: selectProjectsWhitelistsBlockchainsLoading,
  selectStateCachedByParams: selectProjectsWhitelistsBlockchainsState,
} = createQuerySelectors({
  endpoint: fetchProjectsWhitelistsBlockchains,
});

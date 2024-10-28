import { BlockchainID, IApiUserGroupParams } from 'multirpc-sdk';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { RequestType, web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';

import { fetchProjectWhitelistBlockchains } from './fetchProjectWhitelistBlockchains';

export interface IProjectWithBlockchains {
  userEndpointToken: string;
  projectName: string;
  blockchains: BlockchainID[];
  index: number;
}

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
      IProjectWithBlockchains[],
      IFetchProjectsWhitelistsBlockchainsParams
    >({
      providesTags: [RequestType.WhitelistsBlockchains],
      queryFn: createNotifyingQueryFn(
        async ({ group, projects }, { dispatch }) => {
          const data = await Promise.all(
            projects.map(
              async ({ index, name: projectName, userEndpointToken }) => {
                const blockchains = await dispatch(
                  fetchProjectWhitelistBlockchains.initiate({
                    group,
                    token: userEndpointToken,
                  }),
                ).unwrap();

                return { blockchains, index, projectName, userEndpointToken };
              },
            ),
          );

          return { data };
        },
      ),
    }),
  }),
});

export const {
  selectDataWithFallbackCachedByParams: selectProjectsWhitelistsBlockchains,
  selectLoadingCachedByParams: selectProjectsWhitelistsBlockchainsLoading,
  selectStateCachedByParams: selectProjectsWhitelistsBlockchainsState,
} = createQuerySelectors({
  endpoint: fetchProjectsWhitelistsBlockchains,
  fallback: [],
});

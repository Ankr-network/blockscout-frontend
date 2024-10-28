import {
  GetUserEndpointTokenStatusResponse,
  IApiUserGroupParams,
} from 'multirpc-sdk';

import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import { JWT } from '../store/jwtTokenManagerSlice';
import { fetchJWTStatus } from './fetchJWTStatus';

export interface IFetchJWTsStatusesParams extends IApiUserGroupParams {
  projects: JWT[];
}

export interface IJWTStatus {
  status: GetUserEndpointTokenStatusResponse;
  userEndpointToken: string;
}

export const {
  endpoints: { fetchJWTsStatuses },
  useFetchJWTsStatusesQuery,
  useLazyFetchJWTsStatusesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchJWTsStatuses: build.query<IJWTStatus[], IFetchJWTsStatusesParams>({
      queryFn: async ({ group, projects }, { dispatch }) => {
        const projectsStatuses = await Promise.all(
          projects.map<Promise<IJWTStatus>>(async ({ userEndpointToken }) => {
            const status = await dispatch(
              fetchJWTStatus.initiate({
                group,
                userEndpointToken,
              }),
            ).unwrap();

            return { status, userEndpointToken };
          }),
        );

        return { data: projectsStatuses };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectJWTsStatuses,
  selectLoadingCachedByParams: selectJWTsStatusesLoading,
  selectStateCachedByParams: selectJWTsStatusesState,
} = createQuerySelectors({ endpoint: fetchJWTsStatuses, fallback: [] });

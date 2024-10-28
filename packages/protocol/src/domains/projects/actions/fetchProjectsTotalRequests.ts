import { StatsByRangeResponse } from 'multirpc-sdk';

import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

import {
  IFetchProjectTotalRequestsParams,
  fetchProjectTotalRequests,
} from './fetchProjectTotalRequests';

export interface IFetchProjectsTotalRequestsParams
  extends Pick<IFetchProjectTotalRequestsParams, 'duration' | 'group'> {
  tokens: string[];
}

export interface IProjectsTotalRequests {
  [userEndpointToken: string]: StatsByRangeResponse;
}

// The endpoint name is listed in endpointsSerializedByParams constant
// in packages/protocol/src/store/queries/index.ts file.
// If the name has changed it should be refelected there as well.
export const {
  endpoints: { fetchProjectsTotalRequests },
  useFetchProjectsTotalRequestsQuery,
  useLazyFetchProjectsTotalRequestsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectsTotalRequests: build.query<
      IProjectsTotalRequests,
      IFetchProjectsTotalRequestsParams
    >({
      queryFn: async ({ duration, group, tokens }, { dispatch }) => {
        const totalRequests = await Promise.all(
          tokens.map(token =>
            dispatch(
              fetchProjectTotalRequests.initiate({ duration, group, token }),
            ).unwrap(),
          ),
        );

        const data = totalRequests.reduce<IProjectsTotalRequests>(
          (stats, result, index) => {
            const userEndpointToken = tokens[index];

            stats[userEndpointToken] = result;

            return stats;
          },
          {},
        );

        return { data };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  selectDataWithFallbackCachedByParams: selectProjectsTotalRequests,
  selectLoadingCachedByParams: selectProjectsTotalRequestsLoading,
  selectStateCachedByParams: selectProjectsTotalRequestsState,
} = createQuerySelectors({
  endpoint: fetchProjectsTotalRequests,
  fallback: {},
});

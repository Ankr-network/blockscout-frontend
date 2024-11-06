import {
  IFetchPrivateStatsByTokenParams,
  fetchPrivateStatsByToken,
} from 'modules/stats/actions/fetchPrivateStatsByToken';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQuerySelectors } from 'store/utils/createQuerySelectors';
import { web3Api } from 'store/queries';

export interface IFetchProjectsStatsParams
  extends Omit<IFetchPrivateStatsByTokenParams, 'token'> {
  tokens: string[];
}

export const {
  endpoints: { fetchProjectsStats },
  useFetchProjectsStatsQuery,
  useLazyFetchProjectsStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchProjectsStats: build.query<null, IFetchProjectsStatsParams>({
      queryFn: createNotifyingQueryFn(
        async ({ group, interval, tokens }, { dispatch }) => {
          await Promise.all(
            tokens.map(token =>
              dispatch(
                fetchPrivateStatsByToken.initiate({ group, interval, token }),
              ),
            ),
          );

          return { data: null };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

export const {
  selectLoadingCachedByParams: selectProjectsStatsLoading,
  selectStateCachedByParams: selectProjectsStatsState,
} = createQuerySelectors({ endpoint: fetchProjectsStats });

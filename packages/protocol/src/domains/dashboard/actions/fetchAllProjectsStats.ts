import { AccountGateway, IApiPrivateStats } from 'multirpc-sdk';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { ProjectsStatsParams } from '../types';

export interface AllProjectsStats {
  index: JwtManagerToken['index'];
  stats?: IApiPrivateStats;
}

export interface AllProjectsStatsParams extends ProjectsStatsParams {
  projects: JwtManagerToken[];
}

const getProjectStatsPromise = async (
  { index, userEndpointToken }: JwtManagerToken,
  { group, interval }: ProjectsStatsParams,
  api: AccountGateway,
): Promise<AllProjectsStats> => ({
  index,
  stats: await api.getPrivateStatsByPremiumId(
    interval,
    userEndpointToken,
    group,
  ),
});

export const {
  endpoints: { fetchAllProjectsStats },
  useLazyFetchAllProjectsStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllProjectsStats: build.query<
      AllProjectsStats[],
      AllProjectsStatsParams
    >({
      queryFn: createNotifyingQueryFn(async params => {
        const service = MultiService.getService();
        const api = service.getAccountGateway();

        const data = await Promise.all(
          params.projects.map(project =>
            getProjectStatsPromise(project, params, api),
          ),
        );

        return { data };
      }),
    }),
  }),
  overrideExisting: true,
});

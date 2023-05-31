import { AccountGateway, IApiPrivateStats } from 'multirpc-sdk';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { ProjectsStatsParams } from '../types';
import { RootState } from 'store';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { selectProjects } from 'domains/jwtToken/store/selectors';
import { web3Api } from 'store/queries';

export interface AllProjectsStats {
  index: JwtManagerToken['index'];
  stats?: IApiPrivateStats;
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
  useFetchAllProjectsStatsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllProjectsStats: build.query<AllProjectsStats[], ProjectsStatsParams>(
      {
        queryFn: createNotifyingQueryFn(async (params, { getState }) => {
          const service = MultiService.getService();
          const api = service.getAccountGateway();

          const projects = selectProjects(getState() as RootState);

          const data = await Promise.all(
            projects.map(project =>
              getProjectStatsPromise(project, params, api),
            ),
          );

          return { data };
        }),
      },
    ),
  }),
  overrideExisting: true,
});

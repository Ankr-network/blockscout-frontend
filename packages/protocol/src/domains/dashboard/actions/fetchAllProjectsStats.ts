import {
  AccountingGateway,
  IApiPrivateStats,
  EnterpriseGateway,
} from 'multirpc-sdk';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { accountingGateway } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { ProjectsStatsParams } from '../types';

export interface AllProjectsStats {
  index: JwtManagerToken['index'];
  name: JwtManagerToken['name'];
  stats?: IApiPrivateStats;
}

export interface AllProjectsStatsParams extends ProjectsStatsParams {
  projects: JwtManagerToken[];
}

const getProjectStatsPromise = async (
  { index, userEndpointToken, name }: JwtManagerToken,
  { group, interval }: ProjectsStatsParams,
  api: AccountingGateway | EnterpriseGateway,
): Promise<AllProjectsStats> => ({
  index,
  name,
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
      queryFn: createNotifyingQueryFn(
        async ({ projects, group, interval, gateway = accountingGateway }) => {
          const data = await Promise.all(
            projects.map(project =>
              getProjectStatsPromise(project, { group, interval }, gateway),
            ),
          );

          return { data };
        },
      ),
    }),
  }),
  overrideExisting: true,
});

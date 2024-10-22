import {
  AccountingGateway,
  IApiPrivateStats,
  EnterpriseGateway,
} from 'multirpc-sdk';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { getAccountingGateway } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

import { ProjectsStatsParams } from '../types';

export interface AllProjectsStats {
  index: JWT['index'];
  name: JWT['name'];
  stats?: IApiPrivateStats;
}

export interface AllProjectsStatsParams extends ProjectsStatsParams {
  projects: JWT[];
}

const getProjectStatsPromise = async (
  { index, name, userEndpointToken }: JWT,
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
        async ({
          gateway = getAccountingGateway(),
          group,
          interval,
          projects,
        }) => {
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

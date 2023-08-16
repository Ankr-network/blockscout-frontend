import {
  GetUserProjectsRequest,
  GetUserProjectsResponse,
  UserProject,
} from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from 'modules/clients/utils/authorizeBackoffice';

const sortByIndex = (a: UserProject, b: UserProject) => {
  if (a.index < b.index) {
    return -1;
  }

  if (a.index > b.index) {
    return 1;
  }

  return 0;
};

export const {
  useLazyGetUserProjectsQuery,
  endpoints: { getUserProjects },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getUserProjects: build.query<
      GetUserProjectsResponse,
      GetUserProjectsRequest
    >({
      queryFn: async params => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const projects = await backofficeGateway.getUserProjects(params);

        const projectsSortedByIndex = projects?.sort(sortByIndex) || null;

        return {
          data: projectsSortedByIndex,
        };
      },
    }),
  }),
  overrideExisting: true,
});

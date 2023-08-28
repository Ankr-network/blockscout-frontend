import { IJwtTokenStatusResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { RootState } from 'store';

import { selectJwtTokens } from '../store/selectors';

export const {
  useLazyFetchAllJwtTokensStatusesQuery,

  endpoints: { fetchAllJwtTokensStatuses },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAllJwtTokensStatuses: build.query<IJwtTokenStatusResponse[], void>({
      queryFn: async (_, { getState }) => {
        const service = MultiService.getService().getAccountGateway();

        const projects = selectJwtTokens(getState() as RootState);

        const projectsStatuses = await Promise.all(
          projects.map(project =>
            service.getJwtTokenStatus({
              token: project.userEndpointToken,
            }),
          ),
        );

        return { data: projectsStatuses };
      },
    }),
  }),
});

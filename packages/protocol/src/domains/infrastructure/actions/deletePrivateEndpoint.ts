import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { infrastructureFetchEndpoints } from './fetchEndpoints';
import { web3Api } from 'store/queries';

export const {
  useLazyInfrastructureDeletePrivateEndpointQuery,
  endpoints: { infrastructureDeletePrivateEndpoint },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureDeletePrivateEndpoint: build.query<boolean, string>({
      queryFn: createNotifyingQueryFn(async (endpointId, { getState }) => {
        credentialsGuard(getState as GetState);
        const service = MultiService.getService();

        await service.getWorkerGateway().deletePrivateEndpoint(endpointId);

        return { data: true };
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(
          infrastructureFetchEndpoints.initiate(undefined, {
            subscribe: false,
            forceRefetch: true,
          }),
        );
      },
    }),
  }),
});

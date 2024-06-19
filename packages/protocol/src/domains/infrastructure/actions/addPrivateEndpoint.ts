import { IPrivateEndpoint, IWorkerEndpoint } from 'multirpc-sdk';

import { GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { credentialsGuard } from 'domains/auth/utils/credentialsGuard';
import { web3Api } from 'store/queries';

import { createNotifyingQueryFn } from '../../../store/utils/createNotifyingQueryFn';

export const {
  endpoints: { infrastructureApiAddPrivateEndpoint },
  useLazyInfrastructureApiAddPrivateEndpointQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    infrastructureApiAddPrivateEndpoint: build.query<
      IWorkerEndpoint,
      IPrivateEndpoint
    >({
      queryFn: createNotifyingQueryFn(async (privateEndpoint, { getState }) => {
        credentialsGuard(getState as GetState);

        const service = MultiService.getService();

        const endpoint = await service
          .getWorkerGateway()
          .addPrivateEndpoint(privateEndpoint);

        return { data: endpoint };
      }),
    }),
  }),
});
